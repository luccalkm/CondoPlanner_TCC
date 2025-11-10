using Application.DTOs.CommonArea;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Shared.Exceptions;
using System.IO;
using System.IO.Compression;

namespace Application.Services
{
    public class CommonAreaService : ICommonAreaService
    {
        private readonly IRepository<AreaComum> _areaRepository;
        private readonly IRepository<AreaComumFoto> _fotoRepository;
        private readonly IRepository<UsuarioCondominio> _usuarioCondRepo;
        private readonly IMapper _mapper;

        public CommonAreaService(
            IRepository<AreaComum> areaRepository,
            IRepository<AreaComumFoto> fotoRepository,
            IRepository<UsuarioCondominio> usuarioCondRepo,
            IMapper mapper)
        {
            _areaRepository = areaRepository;
            _fotoRepository = fotoRepository;
            _usuarioCondRepo = usuarioCondRepo;
            _mapper = mapper;
        }

        public async Task<List<CommonAreaDto>> GetByCondominiumAsync(int condominiumId)
        {
            var query = _areaRepository
                .Include(a => a.Fotos)
                .Where(a => a.CondominioId == condominiumId)
                .ToList();

            return query.Select(_mapper.Map<CommonAreaDto>).ToList();
        }

        public async Task<CommonAreaDto?> GetByIdAsync(int id)
        {
            var entity = _areaRepository
                .Include(a => a.Fotos)
                .FirstOrDefault(a => a.Id == id);
            return entity is null ? null : _mapper.Map<CommonAreaDto>(entity);
        }

        public async Task<int> UpsertAsync(UpsertCommonAreaInput input, int userId)
        {
            var relation = await _usuarioCondRepo.FirstOrDefaultAsync(uc =>
                uc.UsuarioId == userId &&
                uc.CondominioId == input.CondominiumId &&
                (uc.TipoUsuario == ETipoUsuario.ADMINISTRADOR || uc.TipoUsuario == ETipoUsuario.SINDICO));

            if (relation is null)
                throw new UserFriendlyException("Você não tem permissão para gerenciar áreas comuns neste condomínio.");

            AreaComum entity;
            if (input.Id.HasValue && input.Id.Value > 0)
            {
                entity = await _areaRepository.GetTrackedAsync(a => a.Id == input.Id.Value)
                    ?? throw new UserFriendlyException("Common area not found.");
            }
            else
            {
                entity = new AreaComum { CondominioId = input.CondominiumId };
                await _areaRepository.AddAsync(entity);
            }

            _mapper.Map(input, entity);

            _areaRepository.Update(entity);
            await _areaRepository.SaveChangesAsync();
            return entity.Id;
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
                throw new UserFriendlyException("Você não tem permissão para enviar fotos.");

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

            await _fotoRepository.AddAsync(foto);
            await _fotoRepository.SaveChangesAsync();
        }

        public async Task<CommonAreaPhotoDto> GetPhotoAsync(int photoId, bool includeData = false)
        {
            var foto = await _fotoRepository.GetTrackedAsync(f => f.Id == photoId)
                ?? throw new UserFriendlyException("Foto não encontrada.");

            var dto = _mapper.Map<CommonAreaPhotoDto>(foto);

            if (includeData)
            {
                var decompressed = Decompress(foto.ConteudoZip);
                dto.Base64Data = Convert.ToBase64String(decompressed);
            }

            return dto;
        }

        public async Task RemovePhotoAsync(int photoId)
        {
            var foto = await _fotoRepository.GetByIdAsync(photoId)
                ?? throw new UserFriendlyException("Foto não encontrada.");
            _fotoRepository.Delete(foto);
            await _fotoRepository.SaveChangesAsync();
        }
        
        public async Task<List<CommonAreaPhotoDto>> GetPhotosByAreaAsync(int areaId, bool includeData = false)
        {
            var fotos = await _fotoRepository.FetchAsync(f => f.AreaComumId == areaId);
            var listafotos = fotos.ToList();
            var list = fotos.Select(_mapper.Map<CommonAreaPhotoDto>).ToList();
            if (includeData)
            {
                for (int i = 0; i < listafotos.Count; i++)
                {
                    var decompressed = Decompress(listafotos[i].ConteudoZip);
                    list[i].Base64Data = Convert.ToBase64String(decompressed);
                }
            }
            return list;
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