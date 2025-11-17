using Application.DTOs.CommonArea;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Shared.Exceptions;
using System.IO;
using System.IO.Compression;
using System.Threading.Tasks;

namespace Application.Services
{
    public class CommonAreaService : ICommonAreaService
    {
        private readonly IRepository<AreaComum> _areaRepository;
        private readonly IRepository<AreaComumFoto> _photoRepository;
        private readonly IRepository<UsuarioCondominio> _usuarioCondRepo;
        private readonly IMapper _mapper;

        public CommonAreaService(
            IRepository<AreaComum> areaRepository,
            IRepository<AreaComumFoto> fotoRepository,
            IRepository<UsuarioCondominio> usuarioCondRepo,
            IMapper mapper)
        {
            _areaRepository = areaRepository;
            _photoRepository = fotoRepository;
            _usuarioCondRepo = usuarioCondRepo;
            _mapper = mapper;
        }

        public async Task<List<CommonAreaDto>> GetByCondominiumAsync(int condominiumId)
        {
            var query = _areaRepository
                .Include(a => a.Fotos)
                .Where(a => a.CondominioId == condominiumId)
                .ToList();

            var dtos = query.Select(_mapper.Map<CommonAreaDto>).ToList();

            var work = new List<(AreaComumFoto entity, CommonAreaPhotoDto dto)>();
            for (int i = 0; i < query.Count; i++)
            {
                var entityPhotos = query[i].Fotos?.ToList() ?? new List<AreaComumFoto>();
                var dtoPhotos = dtos[i].Photos ?? new List<CommonAreaPhotoDto>();

                var count = Math.Min(entityPhotos.Count, dtoPhotos.Count);
                for (int j = 0; j < count; j++)
                {
                    work.Add((entityPhotos[j], dtoPhotos[j]));
                }
            }

            if (work.Count > 0)
            {
                var semaphore = new System.Threading.SemaphoreSlim(Math.Max(1, Environment.ProcessorCount - 1));
                var tasks = new List<Task>();
                foreach (var item in work)
                {
                    await semaphore.WaitAsync();
                    var e = item.entity;
                    var d = item.dto;
                    tasks.Add(Task.Run(() =>
                    {
                        try
                        {
                            var decompressed = Decompress(e.ConteudoZip);
                            d.Base64Data = Convert.ToBase64String(decompressed);
                        }
                        finally
                        {
                            semaphore.Release();
                        }
                    }));
                }

                await Task.WhenAll(tasks);
            }

            return dtos;
        }

        public Task<CommonAreaDto?> GetByIdAsync(int id)
        {
            var entity = _areaRepository
                .Include(a => a.Fotos)
                .FirstOrDefault(a => a.Id == id);

            return Task.FromResult(entity is null ? null : _mapper.Map<CommonAreaDto>(entity));
        }

        public async Task<int> CreateAsync(UpsertCommonAreaInput input)
        {
            var relation = await _usuarioCondRepo.FirstOrDefaultAsync(uc =>
                uc.UsuarioId == input.UserId &&
                uc.CondominioId == input.CondominiumId &&
                (uc.TipoUsuario == ETipoUsuario.ADMINISTRADOR || uc.TipoUsuario == ETipoUsuario.SINDICO));

            if (relation is null)
                throw new UserFriendlyException("Você não tem permissão para gerenciar áreas comuns neste condomínio.");

            var entity = new AreaComum { CondominioId = input.CondominiumId };
            _mapper.Map(input, entity);

            await _areaRepository.AddAsync(entity);
            await _areaRepository.SaveChangesAsync();
            return entity.Id;
        }

        public async Task UpdateAsync(UpsertCommonAreaInput input)
        {
            var entity = await _areaRepository.GetTrackedAsync(a => a.Id == input.Id)
                ?? throw new UserFriendlyException("Área comum não encontrada.");

            var relation = await _usuarioCondRepo.FirstOrDefaultAsync(uc =>
                uc.UsuarioId == input.UserId &&
                uc.CondominioId == entity.CondominioId &&
                (uc.TipoUsuario == ETipoUsuario.ADMINISTRADOR || uc.TipoUsuario == ETipoUsuario.SINDICO));

            if (relation is null)
                throw new UserFriendlyException("Você não tem permissão para gerenciar áreas comuns neste condomínio.");

            _mapper.Map(input, entity);
            _areaRepository.Update(entity);
            await _areaRepository.SaveChangesAsync();
        }

        public async Task UploadPhotoAsync(UploadCommonAreaPhotoInput input, int currentUserId)
        {
            var area = await _areaRepository.GetTrackedAsync(a => a.Id == input.AreaId)
                ?? throw new UserFriendlyException("Área comum não encontrada.");

            var relation = await _usuarioCondRepo.FirstOrDefaultAsync(uc =>
                uc.UsuarioId == currentUserId &&
                uc.CondominioId == area.CondominioId &&
                (uc.TipoUsuario == ETipoUsuario.ADMINISTRADOR || uc.TipoUsuario == ETipoUsuario.SINDICO));

            if (relation is null)
                throw new UserFriendlyException("Você não tem permissão para enviar photos.");

            var originalBytes = Convert.FromBase64String(input.Base64Original);
            var hash = Convert.ToHexString(System.Security.Cryptography.SHA256.HashData(originalBytes));

            var alreadyExists = area.Fotos.Any(f => f.HashSha256 == hash);
            if (alreadyExists)
                throw new UserFriendlyException("This file was already uploaded.");

            var compressed = Compress(originalBytes);

            var foto = new AreaComumFoto
            {
                AreaComumId = area.Id,
                ConteudoZip = compressed,
                TipoConteudo = input.ContentType,
                NomeArquivoOriginal = input.FileName,
                TamanhoOriginal = originalBytes.Length,
                HashSha256 = hash
            };

            await _photoRepository.AddAsync(foto);
            await _photoRepository.SaveChangesAsync();
        }

        public async Task RemovePhotoAsync(int photoId)
        {
            var photo = await _photoRepository.GetByIdAsync(photoId)
                ?? throw new UserFriendlyException("Foto não encontrada.");
            _photoRepository.Delete(photo);
            await _photoRepository.SaveChangesAsync();
        }
        
        #region Private Methods
        private static byte[] Compress(byte[] data)
        {
            using var msOut = new MemoryStream();
            using (var gzip = new GZipStream(msOut, CompressionLevel.SmallestSize, leaveOpen: true))
            {
                gzip.Write(data, 0, data.Length);
            }
            return msOut.ToArray();
        }

        private static byte[] Decompress(byte[] gzData)
        {
            using var msIn = new MemoryStream(gzData);
            using var gzip = new GZipStream(msIn, CompressionMode.Decompress);
            using var msOut = new MemoryStream();
            gzip.CopyTo(msOut);
            return msOut.ToArray();
        }
        #endregion
    }
}