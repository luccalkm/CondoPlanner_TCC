using Application.DTOs.Condominium;
using Application.DTOs.Condominium.Invites;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Shared.Exceptions;
using System.Security.Cryptography;
using System.Text;

namespace Application.Services
{
    public class CondominiumInviteService : ICondominiumInviteService
    {
        private readonly IRepository<ConviteCondominio> _inviteRepo;
        private readonly IRepository<UsuarioCondominio> _userCondoRepo;
        private readonly IRepository<Condominio> _condoRepo;
        private readonly IMapper _mapper;

        public CondominiumInviteService(
            IRepository<ConviteCondominio> inviteRepo,
            IRepository<UsuarioCondominio> userCondoRepo,
            IRepository<Condominio> condoRepo,
            IMapper mapper)
        {
            _inviteRepo = inviteRepo;
            _userCondoRepo = userCondoRepo;
            _condoRepo = condoRepo;
            _mapper = mapper;
        }

        public async Task<GenerateInviteResponse> GenerateInviteAsync(GenerateInviteRequest request, int requesterUserId)
        {
            var roles = await _userCondoRepo.FetchAsync(uc => uc.CondominioId == request.CondominiumId && uc.UsuarioId == requesterUserId && uc.Ativo);
            if (!roles.Any() || roles.All(r => r.TipoUsuario is not (ETipoUsuario.ADMINISTRADOR or ETipoUsuario.SINDICO)))
                throw new UserFriendlyException("Você não tem permissão para gerar convites neste condomínio.");

            var condo = await _condoRepo.GetByIdAsync(request.CondominiumId)
                ?? throw new UserFriendlyException("Condomínio não encontrado.");

            var single = request.SingleUse ?? false;
            var expires = DateTime.UtcNow.AddDays(request.ExpiresInDays ?? 7);
            var maxUses = single ? 1 : request.MaxUses;

            if (request.Role == ETipoUsuario.ADMINISTRADOR && !single)
                throw new UserFriendlyException("Convites de ADMINISTRADOR devem ser uso único.");

            var token = GenerateOpaqueToken();

            var entity = new ConviteCondominio
            {
                Token = token,
                CondominioId = request.CondominiumId,
                TipoUsuario = request.Role,
                ExpiraEm = expires,
                UsoUnico = single,
                LimiteUso = maxUses ?? 0,
                ContagemUso = 0,
                UsuarioCriadorId = requesterUserId,
                Nonce = Guid.NewGuid()
            };

            await _inviteRepo.AddAsync(entity);
            await _inviteRepo.SaveChangesAsync();

            return new GenerateInviteResponse
            {
                Token = token,
                ExpiresAt = expires,
                Role = request.Role.ToString(),
                CondominiumId = condo.Id,
                SingleUse = single,
                MaxUses = maxUses
            };
        }

        public async Task<AcceptInviteResponse> AcceptInviteAsync(AcceptInviteRequest request, int userId)
        {
            var invite = await _inviteRepo.FirstOrDefaultAsync(i => i.Token == request.Token);
            if (invite is null)
                return new AcceptInviteResponse { Success = false, Message = "Convite inválido." };

            if (invite.RevogadoEm.HasValue)
                return new AcceptInviteResponse { Success = false, Message = "Convite revogado." };

            if (DateTime.UtcNow > invite.ExpiraEm)
                return new AcceptInviteResponse { Success = false, Message = "Convite expirado." };

            if (invite.UsoUnico && invite.ContagemUso >= 1)
                return new AcceptInviteResponse { Success = false, Message = "Convite já utilizado." };

            if (!invite.UsoUnico && invite.LimiteUso > 0 && invite.ContagemUso >= invite.LimiteUso)
                return new AcceptInviteResponse { Success = false, Message = "Limite de uso atingido." };

            var existing = await _userCondoRepo.FetchAsync(uc => uc.CondominioId == invite.CondominioId && uc.UsuarioId == userId && uc.Ativo);
            if (existing.Any())
            {
                var condo = await _condoRepo.GetByIdAsync(invite.CondominioId);
                return new AcceptInviteResponse
                {
                    Success = false,
                    Role = existing.First().TipoUsuario,
                    Condominium = _mapper.Map<CondominiumDto>(condo),
                    Message = "Usuário já vinculado."
                };
            }

            var userCondo = new UsuarioCondominio
            {
                UsuarioId = userId,
                CondominioId = invite.CondominioId,
                Ativo = true,
                TipoUsuario = invite.TipoUsuario
            };

            await _userCondoRepo.AddAsync(userCondo);

            invite.ContagemUso += 1;
            if (invite.UsoUnico && invite.ContagemUso >= 1)
            {
                invite.RevogadoEm = DateTime.UtcNow;
            }

            _inviteRepo.Update(invite);
            await _inviteRepo.SaveChangesAsync();
            await _userCondoRepo.SaveChangesAsync();

            var condominium = await _condoRepo.GetByIdAsync(invite.CondominioId);

            return new AcceptInviteResponse
            {
                Success = true,
                Role = invite.TipoUsuario,
                Condominium = _mapper.Map<CondominiumDto>(condominium),
                Message = "Convite aceito com sucesso."
            };
        }

        private static string GenerateOpaqueToken()
        {
            const string alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var rng = RandomNumberGenerator.Create();
            var bytes = new byte[18];
            rng.GetBytes(bytes);
            var sb = new StringBuilder();
            foreach (var b in bytes)
                sb.Append(alphabet[b % alphabet.Length]);
            return sb.ToString();
        }
    }
}