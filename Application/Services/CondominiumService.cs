using Application.DTOs.Condominium;
using Application.DTOs.Endereco;
using Application.DTOs.Usuario;
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

        public async Task AddUserToCondominiumAsync(int condominioId, int usuarioId)
        {
            var exists = await _usuarioCondominioRepository
                .FetchAsync(uc => uc.UsuarioId == usuarioId && uc.CondominioId == condominioId);

            if (exists.Any())
                throw new UserFriendlyException("Usuário já está vinculado a este condomínio.");

            var entity = new UsuarioCondominio
            {
                UsuarioId = usuarioId,
                CondominioId = condominioId,
                TipoUsuario = ETipoUsuario.MORADOR,
                Ativo = true
            };

            await _usuarioCondominioRepository.AddAsync(entity);
            await _usuarioCondominioRepository.SaveChangesAsync();
        }

        public async Task<List<UsuarioDto>> GetUsersFromCondominiumAsync(int condominioId)
        {
            var relations = await _usuarioCondominioRepository
                .FetchAsync(uc => uc.CondominioId == condominioId && uc.Ativo);

            if (relations == null || !relations.Any())
                return new List<UsuarioDto>();

            var userIds = relations.Select(r => r.UsuarioId).Distinct().ToList();
            var users = await _usuarioRepository
                .FetchAsync(u => userIds.Contains(u.Id));

            return _mapper.Map<List<UsuarioDto>>(users);
        }

        public async Task<List<CondominioDto>> GetAllByUserAsync(int userId)
        {
            var userRelations = _usuarioCondominioRepository
                .Include(
                    "Condominio",
                    "Condominio.Endereco",
                    "Condominio.VinculosUsuarios",
                    "Condominio.VinculosUsuarios.Usuario",
                    "Usuario"
                )
                .Where(uc => uc.UsuarioId == userId && uc.Ativo)
                .ToList();

            if (!userRelations.Any())
                return new List<CondominioDto>();

            var condominios = new List<CondominioDto>();

            foreach (var relation in userRelations)
            {
                var cond = relation.Condominio;

                var dto = new CondominioDto
                {
                    Id = cond.Id,
                    Nome = cond.Nome,
                    Cnpj = cond.Cnpj,
                    Email = cond.Email,
                    Endereco = _mapper.Map<EnderecoDto>(cond.Endereco),
                    Usuarios = new List<UsuarioDto>()
                };

                if (relation.TipoUsuario != ETipoUsuario.MORADOR)
                {
                    dto.Usuarios = cond.VinculosUsuarios
                        .Where(v => v.Ativo)
                        .Select(v => new UsuarioDto
                        {
                            Id = v.Usuario.Id,
                            Nome = v.Usuario.Nome,
                            Email = v.Usuario.Email,
                            Telefone = v.Usuario.Telefone,
                            Cpf = v.Usuario.Cpf
                        })
                        .ToList();
                }

                condominios.Add(dto);
            }

            return condominios;
        }


        private async Task CreateCondominiumAsync(CreateOrEditCondominiumInput input)
        {
            if (input.Endereco is null)
                throw new UserFriendlyException("O endereço é obrigatório para criar um condomínio.");

            var endereco = _mapper.Map<Endereco>(input.Endereco);
            await _enderecoRepository.AddAsync(endereco);
            await _enderecoRepository.SaveChangesAsync();

            var condominium = _mapper.Map<Condominio>(input);
            condominium.EnderecoId = endereco.Id;

            await _condominioRepository.AddAsync(condominium);
            await _condominioRepository.SaveChangesAsync();

            await AddUserRelationsAsync(condominium.Id, input.UsuariosIds);
        }

        private async Task UpdateCondominiumAsync(CreateOrEditCondominiumInput input)
        {
            var query = _condominioRepository
                .Include(condominium => condominium.Endereco);

            var condominium = query.FirstOrDefault(c => c.Id == input.Id.Value)
                ?? throw new UserFriendlyException("Condomínio não encontrado.");

            if (input.Nome != condominium.Nome)
                condominium.Nome = input.Nome;
            if (input.Cnpj != condominium.Cnpj)
                condominium.Cnpj = input.Cnpj;
            if (input.Email != condominium.Email)
                condominium.Email = input.Email;

            if (input.Endereco is not null)
            {
                if (condominium.Endereco is null)
                {
                    condominium.Endereco = _mapper.Map<Endereco>(input.Endereco);
                }
                else
                {
                    _mapper.Map(input.Endereco, condominium.Endereco);
                }
            }

            _condominioRepository.Update(condominium);
            await _condominioRepository.SaveChangesAsync();

            await AddUserRelationsAsync(condominium.Id, input.UsuariosIds);
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


    }
}
