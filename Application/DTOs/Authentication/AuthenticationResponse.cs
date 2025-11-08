namespace Application.DTOs.Authentication
{
    public class AuthenticationResponse
    {
        public UsuarioDto? Usuario { get; set; }
        public string? Token { get; set; } = string.Empty;
        public bool Sucesso { get; set; }
        public string? Erro { get; set; }
    }
}
