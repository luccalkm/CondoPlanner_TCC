using Application.DTOs.ResidentialLink;

public interface IResidentialLinkService
{
    Task<ResidentialLinkDto?> GetActiveForUserAsync(int userId, int condominiumId);
    Task<ResidentialLinkDto> RequestAsync(int userId, CreateResidentialLinkRequest input);
    Task<IEnumerable<ResidentialLinkDto>> ListPendingAsync(int condominiumId);
    Task<IEnumerable<ResidentialLinkDto>> ListActiveByCondominiumForStaffAsync(int staffUserId, int condominiumId);
    Task<ResidentialLinkDto> ReviewAsync(int reviewerUserId, ReviewResidentialLinkRequest input);
}