
public class BlockInputDto
{
    public int? Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public List<ApartmentInputDto> Apartments { get; set; } = new();
}