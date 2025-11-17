namespace Application.DTOs.Condominium
{
    public class ApartmentDto
    {
        public int Id { get; set; }
        public string Number { get; set; } = string.Empty;
        public string FloorNumber { get; set; } = string.Empty;
        public int BlockId { get; set; }
    }
}