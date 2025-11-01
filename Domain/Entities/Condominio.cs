using Domain.Common;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Condominio : EntidadeRastreadaComum
    {
        public string Nome { get; set; } = string.Empty;
        public string Cnpj { get; set; } = string.Empty;
        public string Endereco { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public ICollection<Bloco> Blocos { get; set; }
        public ICollection<AreaComum> AreasComuns { get; set; }
        public ICollection<Usuario> Usuarios { get; set; }
        public ICollection<Encomenda> Encomendas { get; set; }
    }
}
