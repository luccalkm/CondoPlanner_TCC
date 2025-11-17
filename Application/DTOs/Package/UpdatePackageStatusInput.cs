using Domain.Enums;

namespace Application.DTOs.Package
{
    public class UpdatePackageStatusInput
    {
        public int PackageId { get; set; }
        public EStatusEncomenda Status { get; set; }
        public string? PickupPersonName { get; set; }
        public DateTime? PickedUpAt { get; set; }
    }
}