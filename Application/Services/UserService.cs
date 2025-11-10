using Application.DTOs.User;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Shared.Exceptions;
using Shared.Helpers;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<Usuario> _repository;
        private readonly IMapper _mapper;

        public UserService(IMapper mapper, IRepository<Usuario> repositorio)
        {
            _repository = repositorio;
            _mapper = mapper;
        }

        public async Task<UserDto> GetUserByIdAsync(int userId)
        {
            var foundUser = await _repository.FirstOrDefaultAsync(user => user.Id == userId);

            if (foundUser is null)
                throw new UserFriendlyException("Usuário não encontrado. Faça login novamente.");

            return _mapper.Map<UserDto>(foundUser);
        }

        public async Task<UserDto> EditUserAsync(UserDto dto)
        {
            if (dto is null)
                throw new UserFriendlyException("Os dados do usuário não podem ser nulos.");

            var user = await _repository.GetByIdAsync(dto.Id);

            if (user is null)
                throw new UserFriendlyException("Usuário não encontrado.");

            user.Nome = dto.Name;
            user.Email = dto.Email;
            user.Telefone = dto.Phone;
            user.Cpf = dto.Cpf;

            _repository.Update(user);
            await _repository.SaveChangesAsync();

            return _mapper.Map<UserDto>(user);
        }
    
        public async Task ChangeUserPasswordAsync(ChangePasswordInput input)
        {
            // TODO: Validações das senhas
            if (input.Password.Length < 8)
                throw new UserFriendlyException("A senha não comporta as regras necessárias, tente novamente.");

            var user = await _repository.GetByIdAsync(input.UserId);

            if (user is null)
                throw new UserFriendlyException("Usuário não encontrado.");

            var currentPasswordHash = user.Senha;
            var isSamePassword = PasswordHasherHelper.VerifyPassword(input.Password, currentPasswordHash);

            if (isSamePassword)
                throw new UserFriendlyException("A nova senha não pode ser igual à senha atual.");

            var newPasswordHash = PasswordHasherHelper.HashPassword(input.Password);

            user.Senha = newPasswordHash;

            _repository.Update(user);
            await _repository.SaveChangesAsync();
        }
    }
}
