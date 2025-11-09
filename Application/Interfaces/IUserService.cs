using Application.DTOs.Usuario;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task<UsuarioDto> GetUserByIdAsync(int userId);
        Task<UsuarioDto> EditUserAsync(UsuarioDto dto);
        Task ChangeUserPasswordAsync(ChangePasswordInput input);
    }
}
