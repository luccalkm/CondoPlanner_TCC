using Domain.Common;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ConviteCondominio : EntidadeRastreadaComum
    {
        public string Token { get; set; } = default!;
        public int CondominioId { get; set; }
        public ETipoUsuario TipoUsuario { get; set; }
        public DateTime ExpiraEm { get; set; }
        public bool UsoUnico { get; set; }
        public int ContagemUso { get; set; }
        public int LimiteUso { get; set; }
        public int UsuarioCriadorId { get; set; }
        public DateTime? RevogadoEm { get; set; }
        public Guid? Nonce { get; set; }
    }
}
