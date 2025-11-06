using Domain.Enums;

namespace Application.DTOs.Authentication
{
    public class RegisterRequest
    {
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
        public string Cpf { get; set; } = string.Empty;
    }
}
