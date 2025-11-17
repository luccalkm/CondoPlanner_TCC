using Application.DTOs.Condominium.Invites;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Exceptions;
using System.Security.Claims;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/Condominium")]
    [Authorize]
    public class CondominiumInviteController : ControllerBase
    {
        private readonly ICondominiumInviteService _inviteService;

        public CondominiumInviteController(ICondominiumInviteService inviteService)
        {
            _inviteService = inviteService;
        }

        private int GetCurrentUserId()
        {
            var idStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return int.TryParse(idStr, out var id) ? id : 0;
        }

        [HttpPost("Invites")]
        public async Task<ActionResult<GenerateInviteResponse>> Generate([FromBody] GenerateInviteRequest request)
        {
            var result = await _inviteService.GenerateInviteAsync(request, GetCurrentUserId());
            return Ok(result);
        }

        [HttpPost("AcceptInvite")]
        public async Task<ActionResult<AcceptInviteResponse>> Accept([FromBody] AcceptInviteRequest request)
        {
            var userId = GetCurrentUserId();
            if (userId == 0)
                return Unauthorized(new { message = "Usuário não autenticado." });

            var result = await _inviteService.AcceptInviteAsync(request, userId);
            if (!result.Success)
                return BadRequest(new { message = result.Message });

            return Ok(result);
        }
    }
}