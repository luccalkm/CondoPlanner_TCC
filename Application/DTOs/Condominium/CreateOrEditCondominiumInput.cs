using Application.DTOs.Endereco;

namespace Application.DTOs.Condominium
{
    public class CreateOrEditCondominiumInput
    {
        public int? Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Cnpj { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public EnderecoDto? Endereco { get; set; }

        public List<int>? UsuariosIds { get; set; }
    }
}
