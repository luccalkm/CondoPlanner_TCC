namespace Application.Dtos
{
    public class AuthenticationResponse
    {
        public string Token { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public bool Sucesso { get; set; }
        public string? Erro { get; set; }
    }
}
