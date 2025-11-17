using System;
using Domain.Enums;

namespace Application.DTOs.ResidentialLink
{
    public class ResidentialLinkDto
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public string UserName { get; set; } = string.Empty;

        public int CondominiumId { get; set; }
        public string CondominiumName { get; set; } = string.Empty;

        public int ApartmentId { get; set; }
        public string ApartmentNumber { get; set; } = string.Empty;

        public int BlockId { get; set; }
        public string BlockName { get; set; } = string.Empty;

        public ETipoOcupacao OccupationType { get; set; }
        public bool Active { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public EStatusVinculoResidencial Status { get; set; }
    }
}