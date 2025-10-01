using Domain.Common;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Reservation : CommonTrackedEntity<Guid>
    {
        public string Purpose { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public int NumberOfGuests { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public EReservationStatus Status { get; set; }
        public string Notes { get; set; } = string.Empty;

        public int UnitOccupationId { get; set; }
        public UnitOccupation UnitOccupation { get; set; }

        public int CommonAreaId { get; set; }
        public CommonArea CommonArea { get; set; }
    }


}
