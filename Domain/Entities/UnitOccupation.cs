using Domain.Common;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class UnitOccupation : CommonTrackedEntity
    {
        public EOccupationType OccupationType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsActive { get; set; }

        public int UnitId { get; set; }
        public Unit Unit { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
        public ICollection<Package> Packages { get; set; } = new List<Package>();
    }

}
