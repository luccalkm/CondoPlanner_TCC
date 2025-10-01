using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class CommonArea : CommonTrackedEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string IS { get; set; } = string.Empty;
        public int Capacity { get; set; }
        public TimeSpan OpenTime { get; set; }
        public int MaxDurationMinutes { get; set; }
        public bool IsAvailable { get; set; }
        public bool RequiresApproval { get; set; }
        public int AvailableDaysMask { get; set; }
        public string Notes { get; set; } = string.Empty;

        public int BlockId { get; set; }
        public Block Block { get; set; }

        public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
    }


}
