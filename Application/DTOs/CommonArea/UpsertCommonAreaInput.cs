using System;

namespace Application.DTOs.CommonArea
{
    public class UpsertCommonAreaInput
    {
        public int Id { get; set; }
        public int CondominiumId { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public int Capacity { get; set; }

        public TimeSpan OpeningTime { get; set; }
        public TimeSpan ClosingTime { get; set; }

        public int MaxDuration { get; set; }
        public bool Available { get; set; }
        public bool RequiresApproval { get; set; }
        public int AvailableDays { get; set; }
        public string Notes { get; set; } = string.Empty;
        public int UserId { get; set; }
    }
}