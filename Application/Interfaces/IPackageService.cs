using Application.DTOs.Package;

namespace Application.Interfaces
{
    public interface IPackageService
    {
        Task<int> CreateAsync(CreatePackageInput input, int currentUserId);
        Task UpdateAsync(int id, UpdatePackageInput input, int currentUserId);
        Task UpdateStatusAsync(UpdatePackageStatusInput input, int currentUserId);
        Task DeleteAsync(int id, int currentUserId);

        Task<PackageDto?> GetByIdAsync(int id, int currentUserId);
        Task<List<PackageDto>> ListByCondominiumAsync(int condominiumId, int currentUserId);
        Task<List<PackageDto>> ListByResidentialLinkAsync(int residentialLinkId, int currentUserId);
    }
}