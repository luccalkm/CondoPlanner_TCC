using Application.DTOs.Address;
using Application.DTOs.Condominium;

public class CreateOrEditCondominiumInput
{
    public int? Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Cnpj { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public AddressDto? Address { get; set; }
    public List<int>? UserIds { get; set; }

    public List<BlockInputDto>? Blocks { get; set; }
}