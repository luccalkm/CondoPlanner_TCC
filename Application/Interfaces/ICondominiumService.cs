using Application.DTOs.Condominium;
using Application.DTOs.User;

namespace Application.Interfaces
{
    public interface ICondominiumService
    {
        Task CreateOrEditCondominium(CreateOrEditCondominiumInput dto);
        Task UpsertUserCondominiumAsync(UpsertUserCondominiumInput input);
        Task<List<UserDto>> GetUsersFromCondominiumAsync(int condominiumId);
        Task<List<UserCondominiumDto>> GetAllRelationsByUserAsync(int userId);
        Task<List<UserCondominiumDto>> GetRelationsByCondominiumAsync(int currentUserId, int condominiumId);
    }
}
