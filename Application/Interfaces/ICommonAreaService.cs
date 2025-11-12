using Application.DTOs.CommonArea;

namespace Application.Interfaces
{
    public interface ICommonAreaService
    {
        Task<List<CommonAreaDto>> GetByCondominiumAsync(int condominiumId);
        Task<CommonAreaDto?> GetByIdAsync(int id);
        Task<int> UpsertAsync(UpsertCommonAreaInput input, int userId);

        Task UploadPhotoAsync(UploadCommonAreaPhotoInput input, int currentUserId);
        Task RemovePhotoAsync(int photoId);
    }
}