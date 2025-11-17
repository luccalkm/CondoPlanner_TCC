using Domain.Enums;

namespace Application.DTOs.Package
{
    public class PackageDto
    {
        public int Id { get; set; }
        public string Carrier { get; set; } = string.Empty;
        public DateTime ReceivedAt { get; set; }
        public EStatusEncomenda Status { get; set; }
        public string Notes { get; set; } = string.Empty;
        public DateTime? PickedUpAt { get; set; }
        public string PickupPersonName { get; set; } = string.Empty;
        public int CondominiumId { get; set; }
        public int ResidentialLinkId { get; set; }
    }
}