using Domain.Common;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Bloco
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;

        public int CondominioId { get; set; }
        public Condominio Condominio { get; set; } = null!;

        public ICollection<Apartamento> Apartamentos { get; set; } = new List<Apartamento>();
    }
}
