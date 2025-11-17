using Application.DTOs.Address;
using System.Collections.Generic;

namespace Application.DTOs.Condominium
{
    public class CondominiumDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Cnpj { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public AddressDto Address { get; set; }

        public List<BlockDto> Blocks { get; set; } = new();
    }
}