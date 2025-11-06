using Domain.Common;

namespace Domain.Entities
{
    namespace Domain.Entities
    {
        public class Endereco : EntidadeRastreadaComum
        {
            public string Logradouro { get; set; } = string.Empty;
            public string? Numero { get; set; } = string.Empty;
            public string? Complemento { get; set; } = string.Empty;
            public string Bairro { get; set; } = string.Empty;
            public string Cidade { get; set; } = string.Empty;
            public string Estado { get; set; } = string.Empty;
            public string Cep { get; set; } = string.Empty;
            public string Pais { get; set; } = string.Empty;
        }
    }

}
