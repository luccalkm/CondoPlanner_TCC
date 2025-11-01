using Domain.Common;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Apartamento
    {
        public int Id { get; set; }
        public string Numero { get; set; } = string.Empty;
        public int Andar { get; set; }

        public int BlocoId { get; set; }
        public Bloco Bloco { get; set; } = null!;

        public ICollection<VinculoResidencial> VinculosResidenciais { get; set; } = new List<VinculoResidencial>();
    }
}
