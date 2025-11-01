using Domain.Common;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class UsuarioCondominio : EntidadeRastreadaComum
    {
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; } = null!;

        public int CondominioId { get; set; }
        public Condominio Condominio { get; set; } = null!;

        public ETipoUsuario TipoUsuario { get; set; }
        public DateTime DataInicio { get; set; } = DateTime.UtcNow;
        public DateTime? DataFim { get; set; }
        public bool Ativo { get; set; } = true;
    }
}
