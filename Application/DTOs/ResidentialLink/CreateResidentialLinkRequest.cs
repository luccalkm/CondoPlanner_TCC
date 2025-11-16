using Domain.Enums;

namespace Application.DTOs.ResidentialLink
{
    public class CreateResidentialLinkRequest
    {
        public int CondominiumId { get; set; }
        public string ApartmentNumber { get; set; } = string.Empty;
        public int? BlockId { get; set; }
        public ETipoOcupacao TipoOcupacao { get; set; }
    }
}