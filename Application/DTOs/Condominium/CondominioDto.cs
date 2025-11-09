using Application.DTOs.Endereco;
using Application.DTOs.Usuario;

namespace Application.DTOs.Condominium
{
    public class CondominioDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Cnpj { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public EnderecoDto Endereco { get; set; } = new();
    }
}
