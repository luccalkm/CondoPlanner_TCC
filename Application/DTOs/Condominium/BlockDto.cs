using System.Collections.Generic;

namespace Application.DTOs.Condominium
{
    public class BlockDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<ApartmentDto> Apartments { get; set; } = new();
    }
}