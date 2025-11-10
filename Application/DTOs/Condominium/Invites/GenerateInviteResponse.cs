namespace Application.DTOs.Condominium.Invites
{
    public class GenerateInviteResponse
    {
        public string Token { get; set; } = default!;
        public DateTime ExpiresAt { get; set; }
        public string Role { get; set; } = default!;
        public int CondominiumId { get; set; }
        public bool SingleUse { get; set; }
        public int? MaxUses { get; set; }
    }
}