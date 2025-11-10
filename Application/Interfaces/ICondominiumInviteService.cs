using Application.DTOs.Condominium.Invites;

namespace Application.Interfaces
{
    public interface ICondominiumInviteService
    {
        Task<GenerateInviteResponse> GenerateInviteAsync(GenerateInviteRequest request, int requesterUserId);
        Task<AcceptInviteResponse> AcceptInviteAsync(AcceptInviteRequest request, int userId);
    }
}