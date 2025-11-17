using Application.DTOs.ResidentialLink;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Exceptions;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ResidentialLinksController : ControllerBase
{
    private readonly IResidentialLinkService _service;

    public ResidentialLinksController(IResidentialLinkService residentialLinkService)
    {
        _service = residentialLinkService;
    }

    [HttpGet("my/{condominiumId:int}")]
    public async Task<ActionResult<ResidentialLinkDto>> GetMine(int condominiumId)
    {
        var userId = CurrentUserId();
        var link = await _service.GetActiveForUserAsync(userId, condominiumId);
        if (link is null) return BadRequest();
        return Ok(link);
    }

    [HttpPost("request")]
    public async Task<ActionResult<ResidentialLinkDto>> Request([FromBody] CreateResidentialLinkRequest input)
    {
        var userId = CurrentUserId();
        var result = await _service.RequestAsync(userId, input);
        return Ok(result);
    }

    [HttpGet("pending/{condominiumId:int}")]
    public async Task<ActionResult<IEnumerable<ResidentialLinkDto>>> Pending(int condominiumId)
    {
        var items = await _service.ListPendingAsync(condominiumId);
        return Ok(items);
    }

    [HttpPost("review")]
    public async Task<ActionResult<ResidentialLinkDto>> Review([FromBody] ReviewResidentialLinkRequest input)
    {
        try
        {
            var reviewerId = CurrentUserId();
            var result = await _service.ReviewAsync(reviewerId, input);
            return Ok(result);

        }
        catch (UserFriendlyException ex)
        {
            return BadRequest(new
            {
                message = ex.Message
            });
        }
        catch
        {
            return StatusCode(500, new { message = $"Erro ao efetuar a alteração no vinculo residencial. Tente novamente mais tarde." });
        }
    }

    [HttpGet("active/{condominiumId:int}")]
    public async Task<ActionResult<IEnumerable<ResidentialLinkDto>>> Active(int condominiumId)
    {
        var staffId = CurrentUserId();
        var items = await _service.ListActiveByCondominiumForStaffAsync(staffId, condominiumId);
        return Ok(items);

    }
    private int CurrentUserId()
    {
        var claim = User.FindFirst(ClaimTypes.NameIdentifier) ?? User.FindFirst("sub");
        return claim is not null && int.TryParse(claim.Value, out var id) ? id : 0;
    }
}