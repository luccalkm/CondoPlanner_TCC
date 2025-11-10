using Application.DTOs.User;
using Domain.Enums;

namespace Application.DTOs.Condominium
{
    public class UserCondominiumDto
    {
        public int UserId { get; set; }
        public int CondominiumId { get; set; }
        public ETipoUsuario UserType { get; set; }
        public bool Active { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime? EndDate { get; set; }

        public UserDto User { get; set; }
        public CondominiumDto Condominium { get; set; }
    }
}
