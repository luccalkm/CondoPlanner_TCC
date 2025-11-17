using Application.DTOs.Package;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Shared.Exceptions;

namespace Application.Services
{
    public class PackageService : IPackageService
    {
        private readonly IRepository<Encomenda> _repo;
        private readonly IRepository<VinculoResidencial> _linkRepo;
        private readonly IRepository<UsuarioCondominio> _userCondRepo;
        private readonly IMapper _mapper;

        public PackageService(
            IRepository<Encomenda> repo,
            IRepository<VinculoResidencial> linkRepo,
            IRepository<UsuarioCondominio> userCondRepo,
            IMapper mapper)
        {
            _repo = repo;
            _linkRepo = linkRepo;
            _userCondRepo = userCondRepo;
            _mapper = mapper;
        }

        public async Task<int> CreateAsync(CreatePackageInput input, int currentUserId)
        {
            var link = _linkRepo
                .Include("Apartamento", "Apartamento.Bloco")
                .FirstOrDefault(v => v.Id == input.ResidentialLinkId)
                ?? throw new UserFriendlyException("Vínculo residencial não encontrado.");

            if (link.Apartamento.Bloco.CondominioId != input.CondominiumId)
                throw new UserFriendlyException("Vínculo não pertence ao condomínio informado.");

            if (!await IsStaffAsync(currentUserId, input.CondominiumId))
                throw new UserFriendlyException("Você não tem permissão para registrar encomendas neste condomínio.");

            var entity = _mapper.Map<Encomenda>(input);
            entity.Status = EStatusEncomenda.RECEBIDO;

            await _repo.AddAsync(entity);
            await _repo.SaveChangesAsync();
            return entity.Id;
        }

        public async Task UpdateAsync(int id, UpdatePackageInput input, int currentUserId)
        {
            var entity = await _repo.GetTrackedAsync(e => e.Id == id)
                ?? throw new UserFriendlyException("Encomenda não encontrada.");

            if (!await IsStaffAsync(currentUserId, entity.CondominioId))
                throw new UserFriendlyException("Você não tem permissão para atualizar esta encomenda.");

            _mapper.Map(input, entity);
            _repo.Update(entity);
            await _repo.SaveChangesAsync();
        }

        public async Task UpdateStatusAsync(UpdatePackageStatusInput input, int currentUserId)
        {
            var entity = await _repo.GetTrackedAsync(e => e.Id == input.PackageId)
                ?? throw new UserFriendlyException("Encomenda não encontrada.");

            if (!await IsStaffAsync(currentUserId, entity.CondominioId))
                throw new UserFriendlyException("Você não tem permissão para alterar o status desta encomenda.");

            entity.Status = input.Status;

            if (input.Status == EStatusEncomenda.RETIRADO)
            {
                if (string.IsNullOrWhiteSpace(input.PickupPersonName))
                    throw new UserFriendlyException("Informe o nome do retirante ao marcar como RETIRADO.");
                entity.NomeRetirante = input.PickupPersonName.Trim();
                entity.DataRetirada = input.PickedUpAt ?? DateTime.UtcNow;
            }
            else
            {
                entity.NomeRetirante = string.Empty;
                entity.DataRetirada = null;
            }

            _repo.Update(entity);
            await _repo.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id, int currentUserId)
        {
            var entity = await _repo.GetTrackedAsync(e => e.Id == id)
                ?? throw new UserFriendlyException("Encomenda não encontrada.");

            if (!await IsStaffAsync(currentUserId, entity.CondominioId))
                throw new UserFriendlyException("Você não tem permissão para deletar esta encomenda.");

            _repo.Delete(entity);
            await _repo.SaveChangesAsync();
        }

        public async Task<PackageDto?> GetByIdAsync(int id, int currentUserId)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity is null) return null;

            var allowed = await IsStaffAsync(currentUserId, entity.CondominioId) ||
                          await IsOwnerOfLinkAsync(currentUserId, entity.VinculoResidencialId);

            if (!allowed)
                throw new UserFriendlyException("Você não tem permissão para visualizar esta encomenda.");

            return _mapper.Map<PackageDto>(entity);
        }

        public async Task<List<PackageDto>> ListByCondominiumAsync(int condominiumId, int currentUserId)
        {
            if (!await IsStaffAsync(currentUserId, condominiumId))
                throw new UserFriendlyException("Você não tem permissão para listar encomendas deste condomínio.");

            var list = (await _repo.FetchAsync(e => e.CondominioId == condominiumId)).ToList();
            return list.Select(_mapper.Map<PackageDto>).ToList();
        }

        public async Task<List<PackageDto>> ListByResidentialLinkAsync(int residentialLinkId, int currentUserId)
        {
            if (!await IsOwnerOfLinkAsync(currentUserId, residentialLinkId))
                throw new UserFriendlyException("Você não tem permissão para visualizar encomendas deste vínculo.");

            var list = (await _repo.FetchAsync(e => e.VinculoResidencialId == residentialLinkId)).ToList();
            return list.Select(_mapper.Map<PackageDto>).ToList();
        }

        private async Task<bool> IsStaffAsync(int userId, int condominiumId)
        {
            var rel = await _userCondRepo.FirstOrDefaultAsync(uc =>
                uc.UsuarioId == userId &&
                uc.CondominioId == condominiumId &&
                (uc.TipoUsuario == ETipoUsuario.ADMINISTRADOR ||
                 uc.TipoUsuario == ETipoUsuario.SINDICO ||
                 uc.TipoUsuario == ETipoUsuario.PORTEIRO));

            return rel != null;
        }

        private async Task<bool> IsOwnerOfLinkAsync(int userId, int residentialLinkId)
        {
            var link = await _linkRepo.FirstOrDefaultAsync(v => v.Id == residentialLinkId);
            return link != null && link.UsuarioId == userId;
        }
    }
}