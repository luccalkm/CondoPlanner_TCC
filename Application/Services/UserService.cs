using Application.DTOs.Usuario;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Shared.Exceptions;
using Shared.Helpers;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<Usuario> _repositorio;
        private readonly IMapper _mapper;

        public UserService(IMapper mapper, IRepository<Usuario> repositorio)
        {
            _repositorio = repositorio;
            _mapper = mapper;
        }

        public async Task<UsuarioDto> GetUserByIdAsync(int userId)
        {
            var foundUser = await _repositorio.FirstOrDefaultAsync(user => user.Id == userId);

            if (foundUser is null)
                throw new UserFriendlyException("Usuário não encontrado. Faça login novamente.");

            return _mapper.Map<UsuarioDto>(foundUser);
        }

        public async Task<UsuarioDto> EditUserAsync(UsuarioDto dto)
        {
            if (dto is null)
                throw new UserFriendlyException("Os dados do usuário não podem ser nulos.");

            var user = await _repositorio.FirstOrDefaultAsync(u => u.Id == dto.Id);

            if (user is null)
                throw new UserFriendlyException("Usuário não encontrado.");

            user.Nome = dto.Nome;
            user.Email = dto.Email;
            user.Telefone = dto.Telefone;
            user.Cpf = dto.Cpf;

            _repositorio.Update(user);
            await _repositorio.SaveChangesAsync();

            return _mapper.Map<UsuarioDto>(user);
        }
    
        public async Task ChangeUserPasswordAsync(ChangePasswordInput input)
        {
            // TODO: Validações das senhas
            if (input.Password.Length < 8)
                throw new UserFriendlyException("A senha não comporta as regras necessárias, tente novamente.");

            var user = await _repositorio.GetByIdAsync(input.UserId);

            if (user is null)
                throw new UserFriendlyException("Usuário não encontrado.");

            var senhaAtualHash = user.Senha;
            var regraSenhaIgual = PasswordHasherHelper.VerifyPassword(input.Password, senhaAtualHash);

            if (regraSenhaIgual)
                throw new UserFriendlyException("A nova senha não pode ser igual à senha atual.");

            var novaSenhaHash = PasswordHasherHelper.HashPassword(input.Password);

            user.Senha = novaSenhaHash;

            _repositorio.Update(user);
            await _repositorio.SaveChangesAsync();
        }
    }
}
