namespace Application.DTOs.Package
{
    public class CreatePackageInput
    {
        public string Carrier { get; set; } = string.Empty;
        public DateTime? ReceivedAt { get; set; }
        public string Notes { get; set; } = string.Empty;
        public int CondominiumId { get; set; }
        public int ResidentialLinkId { get; set; }
    }
}