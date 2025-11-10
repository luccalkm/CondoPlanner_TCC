using Domain.Enums;

namespace Application.DTOs.Condominium.Invites
{
    public class GenerateInviteRequest
    {
        public int CondominiumId { get; set; }
        public ETipoUsuario Role { get; set; }
        public bool? SingleUse { get; set; }
        public int? MaxUses { get; set; }
        public int? ExpiresInDays { get; set; }
    }
}