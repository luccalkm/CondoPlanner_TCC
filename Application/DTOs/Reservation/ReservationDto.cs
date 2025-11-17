using Application.DTOs.CommonArea;
using Domain.Enums;

namespace Application.DTOs.Reservation
{
    public class ReservationDto
    {
        public int Id { get; set; }
        public int AreaId { get; set; }
        public CommonAreaDto CommonArea { get; set; }
        public int CondominiumId { get; set; }
        public int VinculoResidencialId { get; set; }

        public string Purpose { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public int Guests { get; set; }
        public EStatusReserva Status { get; set; }
        public string Notes { get; set; } = string.Empty;
    }
}
