using Application.Dtos;

namespace Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthenticationResponse?> LoginAsync(LoginRequest request);
        Task<RegisterResponse> RegisterAsync(RegisterRequest request);
    }
}
