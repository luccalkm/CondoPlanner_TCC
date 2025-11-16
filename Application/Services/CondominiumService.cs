using Application.DTOs.Address;
using Application.DTOs.Condominium;
using Application.DTOs.Endereco;
using Application.DTOs.User;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Entities.Domain.Entities;
using Domain.Enums;
using Shared.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Services
{
    public class CondominiumService : ICondominiumService
    {
        private readonly IRepository<Condominio> _condominioRepository;
        private readonly IRepository<UsuarioCondominio> _usuarioCondominioRepository;
        private readonly IRepository<Usuario> _usuarioRepository;
        private readonly IRepository<Endereco> _enderecoRepository;
        private readonly IMapper _mapper;

        public CondominiumService(
            IRepository<Condominio> condominioRepository,
            IRepository<UsuarioCondominio> usuarioCondominioRepository,
            IRepository<Usuario> usuarioRepository,
            IRepository<Endereco> enderecoRepository,
            IMapper mapper)
        {
            _condominioRepository = condominioRepository;
            _usuarioCondominioRepository = usuarioCondominioRepository;
            _usuarioRepository = usuarioRepository;
            _enderecoRepository = enderecoRepository;
            _mapper = mapper;
        }

        public async Task CreateOrEditCondominium(CreateOrEditCondominiumInput input)
        {
            if (input is null)
                throw new ArgumentNullException(nameof(input), "O input não pode ser nulo.");

            if (!input.Id.HasValue || input.Id == 0)
            {
                await CreateCondominiumAsync(input);
                return;
            }

            await UpdateCondominiumAsync(input);
        }

        public async Task UpsertUserCondominiumAsync(UpsertUserCondominiumInput input)
        {
            var existingRelation = await _usuarioCondominioRepository
                .GetTrackedAsync(uc => uc.UsuarioId == input.UserId && uc.CondominioId == input.CondominiumId);

            if (existingRelation is null)
            {
                var entity = new UsuarioCondominio
                {
                    UsuarioId = input.UserId,
                    CondominioId = input.CondominiumId,
                    TipoUsuario = input.UserType != null ? input.UserType : ETipoUsuario.MORADOR,
                    Ativo = true
                };

                await _usuarioCondominioRepository.AddAsync(entity);
                await _usuarioCondominioRepository.SaveChangesAsync();
                return;
            }

            existingRelation.TipoUsuario = input.UserType;
            existingRelation.Ativo = input.Active;

            if (input.Active)
            {
                existingRelation.DataInativacao = null;
            }
            else
            {
                existingRelation.DataInativacao = input.StartDate ?? DateTime.UtcNow;
            }

            _usuarioCondominioRepository.Update(existingRelation);
            await _usuarioCondominioRepository.SaveChangesAsync();
        }

        public async Task<List<UserDto>> GetUsersFromCondominiumAsync(int condominioId)
        {
            var relations = await _usuarioCondominioRepository
                .FetchAsync(uc => uc.CondominioId == condominioId);

            if (relations == null || !relations.Any())
                return new List<UserDto>();

            var userIds = relations.Select(r => r.UsuarioId).Distinct().ToList();
            var users = await _usuarioRepository
                .FetchAsync(u => userIds.Contains(u.Id));

            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<List<UserCondominiumDto>> GetAllRelationsByUserAsync(int userId)
        {
            var userRelations = _usuarioCondominioRepository
                .Include("Condominio", "Condominio.Endereco", "Usuario", "Condominio.Blocos", "Condominio.Blocos.Apartamentos")
                .Where(uc => uc.UsuarioId == userId && uc.Ativo)
                .ToList();

            if (!userRelations.Any())
                return new List<UserCondominiumDto>();

            return userRelations.Select(MapRelation).ToList();
        }

        public async Task<List<UserCondominiumDto>> GetRelationsByCondominiumAsync(int currentUserId, int condominiumId)
        {
            var adminRelation = await _usuarioCondominioRepository
                .FirstOrDefaultAsync(uc => uc.UsuarioId == currentUserId && uc.CondominioId == condominiumId);

            if (adminRelation is null || 
                adminRelation.TipoUsuario == ETipoUsuario.MORADOR ||
                adminRelation.TipoUsuario == ETipoUsuario.PORTEIRO)
                throw new UserFriendlyException("Somente administradores podem visualizar todas as relações deste condomínio.");

            var relations = _usuarioCondominioRepository
                .Include("Condominio", "Condominio.Endereco", "Usuario")
                .Where(uc => uc.CondominioId == condominiumId)
                .ToList();

            if (!relations.Any())
                return new List<UserCondominiumDto>();

            return relations.Select(MapRelation).ToList();
        }

        #region Private Methods
        private async Task CreateCondominiumAsync(CreateOrEditCondominiumInput input)
        {
            if (input.Address is null)
                throw new UserFriendlyException("O endereço é obrigatório para criar um condomínio.");

            var endereco = _mapper.Map<Endereco>(input.Address);
            await _enderecoRepository.AddAsync(endereco);
            await _enderecoRepository.SaveChangesAsync();

            var condominium = _mapper.Map<Condominio>(input);
            condominium.EnderecoId = endereco.Id;

            if (input.Blocks != null && input.Blocks.Any())
            {
                var blocos = _mapper.Map<List<Bloco>>(input.Blocks);
                
                foreach (var bloco in blocos)
                {
                    bloco.Condominio = condominium;
                    foreach (var apt in bloco.Apartamentos)
                    {
                        apt.Bloco = bloco;
                    }
                }

                condominium.Blocos = blocos;
            }

            await _condominioRepository.AddAsync(condominium);
            await _condominioRepository.SaveChangesAsync();

            await AddUserRelationsAsync(condominium.Id, input.UserIds);
        }

        private async Task UpdateCondominiumAsync(CreateOrEditCondominiumInput input)
        {
            var query = _condominioRepository
                .Include("Endereco", "Blocos", "Blocos.Apartamentos");

            var condominium = query.FirstOrDefault(c => c.Id == input.Id!.Value)
                ?? throw new UserFriendlyException("Condomínio não encontrado.");

            if (input.Name != condominium.Nome)
                condominium.Nome = input.Name;
            if (input.Cnpj != condominium.Cnpj)
                condominium.Cnpj = input.Cnpj;
            if (input.Email != condominium.Email)
                condominium.Email = input.Email;

            if (input.Address is not null)
            {
                if (condominium.Endereco is null)
                {
                    condominium.Endereco = _mapper.Map<Endereco>(input.Address);
                }
                else
                {
                    _mapper.Map(input.Address, condominium.Endereco);
                }
            }

            if (input.Blocks is not null)
                UpdateBlocksAndApartments(condominium, input.Blocks);

            _condominioRepository.Update(condominium);
            await _condominioRepository.SaveChangesAsync();

            await AddUserRelationsAsync(condominium.Id, input.UserIds);
        }

        private async Task AddUserRelationsAsync(int condominiumId, IEnumerable<int> userIds)
        {
            if (userIds is null)
                return;

            var distinctUserIds = userIds.Distinct().ToList();
            if (distinctUserIds.Count == 0)
                return;

            var existingUsers = await _usuarioRepository
                .FetchAsync(u => distinctUserIds.Contains(u.Id));

            var validUserIds = existingUsers
                .Select(u => u.Id)
                .ToHashSet();

            if (validUserIds.Count == 0)
                return;

            var existingRelations = await _usuarioCondominioRepository
                .FetchAsync(uc => validUserIds.Contains(uc.UsuarioId) && uc.CondominioId == condominiumId);

            var alreadyLinkedIds = existingRelations
                .Select(uc => uc.UsuarioId)
                .ToHashSet();

            var newRelations = validUserIds
                .Except(alreadyLinkedIds)
                .Select(userId => new UsuarioCondominio
                {
                    UsuarioId = userId,
                    CondominioId = condominiumId,
                    TipoUsuario = ETipoUsuario.ADMINISTRADOR,
                    Ativo = true
                })
                .ToList();

            if (newRelations.Count > 0)
            {
                await _usuarioCondominioRepository.BulkAddAsync(newRelations);
                await _usuarioCondominioRepository.SaveChangesAsync();
            }
        }

        private UserCondominiumDto MapRelation(UsuarioCondominio relation)
        {
            var cond = relation.Condominio;
            var user = relation.Usuario;

            var condDto = new CondominiumDto
            {
                Id = cond.Id,
                Name = cond.Nome,
                Cnpj = cond.Cnpj,
                Email = cond.Email,
                Address = _mapper.Map<AddressDto>(cond.Endereco),
                Blocks = _mapper.Map<List<BlockDto>>(cond.Blocos)
            };

            var userDto = new UserDto
            {
                Id = user.Id,
                Name = user.Nome,
                Phone = user.Telefone,
            };

            if (relation.TipoUsuario is ETipoUsuario.ADMINISTRADOR or ETipoUsuario.SINDICO)
            {
                userDto.Email = user.Email;
                userDto.Cpf = user.Cpf;
            }

            return new UserCondominiumDto
            {
                UserId = user.Id,
                CondominiumId = cond.Id,
                UserType = relation.TipoUsuario,
                Active = relation.Ativo,
                CreationTime = relation.DataCriacao,
                User = userDto,
                Condominium = condDto
            };
        }
        #endregion

        private void UpdateBlocksAndApartments(Condominio condo, List<BlockInputDto> blocksDto)
        {
            var dtoIds = blocksDto.Where(b => b.Id.HasValue).Select(b => b.Id!.Value).ToHashSet();
            var blocksToRemove = condo.Blocos.Where(b => b.Id != 0 && !dtoIds.Contains(b.Id)).ToList();
            foreach (var b in blocksToRemove)
                condo.Blocos.Remove(b);

            foreach (var blockDto in blocksDto)
            {
                Bloco block;
                if (blockDto.Id.HasValue && blockDto.Id.Value != 0)
                {
                    block = condo.Blocos.FirstOrDefault(b => b.Id == blockDto.Id.Value)
                        ?? throw new UserFriendlyException($"Bloco {blockDto.Id.Value} não encontrado.");
                    block.Nome = blockDto.Name;

                    UpdateApartments(block, blockDto.Apartments);
                }
                else
                {
                    block = _mapper.Map<Bloco>(blockDto);
                    block.Condominio = condo;

                    foreach (var apt in block.Apartamentos)
                        apt.Bloco = block;

                    condo.Blocos.Add(block);
                }
            }
        }

        private void UpdateApartments(Bloco block, List<ApartmentInputDto> apartmentsDto)
        {
            var dtoIds = apartmentsDto.Where(a => a.Id.HasValue).Select(a => a.Id!.Value).ToHashSet();
            var toRemove = block.Apartamentos.Where(a => a.Id != 0 && !dtoIds.Contains(a.Id)).ToList();
            foreach (var a in toRemove)
                block.Apartamentos.Remove(a);

            foreach (var aptDto in apartmentsDto)
            {
                if (aptDto.Id.HasValue && aptDto.Id.Value != 0)
                {
                    var existing = block.Apartamentos.FirstOrDefault(a => a.Id == aptDto.Id.Value)
                        ?? throw new UserFriendlyException($"Apartamento {aptDto.Id.Value} não encontrado.");
                    existing.Numero = aptDto.Number;
                    existing.Andar = aptDto.FloorNumber;
                }
                else
                {
                    var novo = _mapper.Map<Apartamento>(aptDto);
                    novo.Bloco = block;
                    block.Apartamentos.Add(novo);
                }
            }
        }
    }
}
