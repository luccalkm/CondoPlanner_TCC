using Application.DTOs.User;

namespace Application.DTOs.Authentication
{
    public class AuthenticationResponse
    {
        public UserDto? Usuario { get; set; }
        public string? Token { get; set; } = string.Empty;
        public bool Sucesso { get; set; }
        public string? Erro { get; set; }
    }
}
