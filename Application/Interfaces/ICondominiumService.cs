using Application.DTOs.Condominium;
using Application.DTOs.Usuario;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ICondominiumService
    {
        Task CreateOrEditCondominium(CreateOrEditCondominiumInput dto);
        Task AddUserToCondominiumAsync(int condominioId, int usuarioId);
        Task<List<UsuarioDto>> GetUsersFromCondominiumAsync(int condominioId);
        Task<List<CondominioDto>> GetAllByUserAsync(int userId);
    }
}
