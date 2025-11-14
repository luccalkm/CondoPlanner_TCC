namespace Application.DTOs.Reservation
{
    public class CreateReservationInput
    {
        public int AreaId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Guests { get; set; }
        public string Purpose { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
    }
}
