using Application.DTOs.CommonArea;

namespace Application.Interfaces
{
    public interface ICommonAreaService
    {
        Task<List<CommonAreaDto>> GetByCondominiumAsync(int condominiumId);
        Task<CommonAreaDto?> GetByIdAsync(int id);
        Task<int> UpsertAsync(UpsertCommonAreaInput input, int userId);

        Task UploadPhotoAsync(UploadCommonAreaPhotoInput input, int currentUserId);
        Task<CommonAreaPhotoDto> GetPhotoAsync(int photoId, bool includeData = false);
        Task<List<CommonAreaPhotoDto>> GetPhotosByAreaAsync(int areaId, bool includeData = false);
        Task RemovePhotoAsync(int photoId);
    }
}