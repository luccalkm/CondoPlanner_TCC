using Application.DTOs.CommonArea;

namespace Application.Interfaces
{
    public interface ICommonAreaService
    {
        Task<List<CommonAreaDto>> GetByCondominiumAsync(int condominiumId);
        Task<CommonAreaDto?> GetByIdAsync(int id);

        Task<int> CreateAsync(UpsertCommonAreaInput input);
        Task UpdateAsync(UpsertCommonAreaInput input);

        Task UploadPhotoAsync(UploadCommonAreaPhotoInput input, int currentUserId);
        Task RemovePhotoAsync(int photoId);
    }
}