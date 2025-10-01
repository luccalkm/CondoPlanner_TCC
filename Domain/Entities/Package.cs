using Domain.Common;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Package : CommonTrackedEntity
    {
        public string CarrierName { get; set; } = string.Empty;
        public DateTime ArrivedAt { get; set; }
        public EPackageStatus Status { get; set; }
        public string Notes { get; set; } = string.Empty;
        public DateTime? PickedUpAt { get; set; }
        public string? PickedUpByName { get; set; }

        public int UnitOccupationId { get; set; }
        public UnitOccupation UnitOccupation { get; set; }
    }

}
