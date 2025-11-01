using Domain.Common;
using Domain.Entities.Domain.Entities;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Condominio : EntidadeRastreadaComum
    {
        public string Nome { get; set; } = string.Empty;
        public string Cnpj { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public int EnderecoId { get; set; }
        public Endereco Endereco { get; set; } = null!;

        public ICollection<Bloco> Blocos { get; set; } = new List<Bloco>();
        public ICollection<AreaComum> AreasComuns { get; set; } = new List<AreaComum>();
        public ICollection<Encomenda> Encomendas { get; set; } = new List<Encomenda>();
        public ICollection<UsuarioCondominio> VinculosUsuarios { get; set; } = new List<UsuarioCondominio>();
    }
}
