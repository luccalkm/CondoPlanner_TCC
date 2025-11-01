using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Unit : EntidadeRastreadaComum
    {
        public string Number { get; set; } = string.Empty;
        public int Floor { get; set; }

        public int BlockId { get; set; }
        public Bloco Block { get; set; }

        public ICollection<UnitOccupation> Occupations { get; set; } = new List<UnitOccupation>();
    }


}
