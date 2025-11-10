using Application.DTOs.Condominium;
using Application.DTOs.User;

namespace Application.Interfaces
{
    public interface ICondominiumService
    {
        Task CreateOrEditCondominium(CreateOrEditCondominiumInput dto);
        Task AddUserToCondominiumAsync(int condominiumId, int userId);
        Task<List<UserDto>> GetUsersFromCondominiumAsync(int condominiumId);
        Task<List<UserCondominiumDto>> GetAllRelationsByUserAsync(int userId);
    }
}
