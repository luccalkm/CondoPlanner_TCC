using Domain.Enums;
using Application.DTOs.Condominium;

namespace Application.DTOs.Condominium.Invites
{
    public class AcceptInviteResponse
    {
        public bool Success { get; set; }
        public ETipoUsuario Role { get; set; }
        public CondominiumDto Condominium { get; set; } = default!;
        public string? Message { get; set; }
    }
}