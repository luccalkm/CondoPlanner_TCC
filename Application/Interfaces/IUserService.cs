using Application.DTOs.User;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetUserByIdAsync(int userId);
        Task<UserDto> EditUserAsync(UserDto dto);
        Task ChangeUserPasswordAsync(ChangePasswordInput input);
    }
}
