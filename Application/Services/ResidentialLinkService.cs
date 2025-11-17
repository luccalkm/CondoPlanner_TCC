using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.ResidentialLink;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Shared.Exceptions;

namespace Application.Services
{
    public class ResidentialLinkService : IResidentialLinkService
    {
        private readonly IRepository<VinculoResidencial> _linkRepo;
        private readonly IRepository<Apartamento> _apRepo;
        private readonly IRepository<Bloco> _blocoRepo;
        private readonly IMapper _mapper;

        public ResidentialLinkService(
            IRepository<VinculoResidencial> linkRepo,
            IRepository<Apartamento> apRepo,
            IRepository<Bloco> blocoRepo,
            IMapper mapper)
        {
            _linkRepo = linkRepo;
            _apRepo = apRepo;
            _blocoRepo = blocoRepo;
            _mapper = mapper;
        }

        public Task<ResidentialLinkDto?> GetActiveForUserAsync(int userId, int condominiumId)
        {
            var vinculo = _linkRepo
                .Include("Apartamento.Bloco.Condominio")
                .Where(v => v.UsuarioId == userId &&
                            v.Status != EStatusVinculoResidencial.Cancelado &&
                            v.Status != EStatusVinculoResidencial.Rejeitado &&
                            v.Apartamento.Bloco.CondominioId == condominiumId)
                .FirstOrDefault();

            if (vinculo == null) return Task.FromResult<ResidentialLinkDto?>(null);
            return Task.FromResult<ResidentialLinkDto?>(_mapper.Map<ResidentialLinkDto>(vinculo));
        }

        public async Task<ResidentialLinkDto> RequestAsync(int userId, CreateResidentialLinkRequest input)
        {
            if (string.IsNullOrWhiteSpace(input.ApartmentNumber))
                throw new UserFriendlyException("Informe o número do apartamento.");

            var numero = input.ApartmentNumber.Trim().ToUpperInvariant();

            Bloco? bloco = null;
            if (input.BlockId.HasValue)
            {
                bloco = await _blocoRepo.GetByIdAsync(input.BlockId.Value);
                if (bloco == null || bloco.CondominioId != input.CondominiumId)
                    throw new UserFriendlyException("Bloco inválido para o condomínio informado.");
            }

            var apartmentsQuery = _apRepo
                .Include("Bloco")
                .Where(a => a.Numero.ToUpper() == numero &&
                            a.Bloco.CondominioId == input.CondominiumId);

            if (bloco != null)
                apartmentsQuery = apartmentsQuery.Where(a => a.BlocoId == bloco.Id);

            var apartments = apartmentsQuery.ToList();

            if (apartments.Count == 0)
                throw new UserFriendlyException("Apartamento não cadastrado para este condomínio. Solicite ao administrador o cadastro.");

            if (apartments.Count > 1 && bloco == null)
                throw new UserFriendlyException("Existe mais de um apartamento com esse número em blocos diferentes. Informe o bloco.");

            var apartment = bloco != null
                ? apartments.First(a => a.BlocoId == bloco.Id)
                : apartments.First();

            var existing = _linkRepo
                .Include("Apartamento.Bloco")
                .Where(v => v.UsuarioId == userId &&
                            v.Apartamento.Bloco.CondominioId == input.CondominiumId &&
                            v.DataFim == null)
                .FirstOrDefault();

            if (existing != null)
            {
                if (existing.Ativo && existing.Status == EStatusVinculoResidencial.Aprovado)
                    throw new UserFriendlyException("Você já possui um vínculo ativo neste condomínio.");
                else
                    throw new UserFriendlyException("Há um pedido de vínculo pendente neste condomínio.");
            }

            var vinculo = new VinculoResidencial
            {
                UsuarioId = userId,
                ApartamentoId = apartment.Id,
                TipoOcupacao = input.TipoOcupacao,
                DataInicio = DateTime.UtcNow,
                DataFim = null,
                Ativo = false,
                Status = EStatusVinculoResidencial.Pendente
            };

            await _linkRepo.AddAsync(vinculo);
            await _linkRepo.SaveChangesAsync();

            var created = _linkRepo
                .Include("Apartamento.Bloco.Condominio")
                .First(v => v.Id == vinculo.Id);

            return _mapper.Map<ResidentialLinkDto>(created);
        }

        public Task<IEnumerable<ResidentialLinkDto>> ListPendingAsync(int condominiumId)
        {
            var pending = _linkRepo
                .Include("Apartamento.Bloco.Condominio", "Usuario")
                .Where(v => v.Status == EStatusVinculoResidencial.Pendente &&
                            v.DataFim == null &&
                            v.Apartamento.Bloco.CondominioId == condominiumId)
                .ToList();

            return Task.FromResult(pending.Select(_mapper.Map<ResidentialLinkDto>));
        }

        public async Task<ResidentialLinkDto> ReviewAsync(int reviewerUserId, ReviewResidentialLinkRequest input)
        {
            var vinculo = await _linkRepo.GetByIdAsync(input.LinkId);
            if (vinculo == null)
                throw new UserFriendlyException("Vínculo residencial não encontrado.");

            if (vinculo.DataFim != null || vinculo.Status != EStatusVinculoResidencial.Pendente)
                throw new UserFriendlyException("Este pedido já foi finalizado.");

            if (input.Aprovar)
            {
                vinculo.Ativo = true;
                vinculo.Status = EStatusVinculoResidencial.Aprovado;
                if (vinculo.DataInicio == default)
                    vinculo.DataInicio = DateTime.UtcNow;
            }
            else
            {
                vinculo.Ativo = false;
                vinculo.Status = EStatusVinculoResidencial.Rejeitado;
                vinculo.DataFim = DateTime.UtcNow;
            }

            _linkRepo.Update(vinculo);
            await _linkRepo.SaveChangesAsync();

            var updated = _linkRepo
                .Include("Apartamento.Bloco.Condominio")
                .First(v => v.Id == vinculo.Id);

            return _mapper.Map<ResidentialLinkDto>(updated);
        }
    }
}