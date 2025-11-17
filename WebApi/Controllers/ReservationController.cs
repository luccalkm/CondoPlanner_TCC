using Application.DTOs.Reservation;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Exceptions;
using System.Security.Claims;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService _service;

        public ReservationController(IReservationService service)
        {
            _service = service;
        }

        [HttpGet("Area/{areaId:int}")]
        public async Task<ActionResult<List<ReservationDto>>> GetByArea(int areaId, [FromQuery] DateTime start, [FromQuery] DateTime end)
        {
            if (end < start) return BadRequest("Período inválido.");
            var list = await _service.GetByAreaAsync(areaId, start, end);
            return Ok(list);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateReservationInput input)
        {
            try
            {
                if (input is null) return BadRequest("Solicitação inválida.");
                var id = await _service.CreateAsync(input, CurrentUserId());
                return Ok(new { id });

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
                return StatusCode(500, new { message = $"Erro ao buscar relações." });
            }
        }

        [HttpPost("{reservationId:int}/Cancel")]
        public async Task<IActionResult> Cancel(int reservationId)
        {
            await _service.CancelAsync(reservationId, CurrentUserId());
            return Ok();
        }


        [HttpPost("ApproveOrReject")]
        public async Task<IActionResult> ApproveOrReject([FromBody] ApproveOrRejectReservationInput input)
        {
            if (input.UserId != 0 && input.UserId != CurrentUserId())
                return BadRequest(new { message = "Conflito de usuários. Reinicie sua sessão e tente novamente." });
            
            input.UserId = CurrentUserId();
            await _service.ApproveOrRejectAsync(input);
            return Ok();
        }

        [HttpGet("Pending/{condominiumId:int}")]
        public async Task<ActionResult<List<ReservationDto>>> GetPendingReservations(int condominiumId)
        {
            try
            {
                var reservations = await _service.GetPendingReservationsAsync(condominiumId);
                return Ok(reservations);
            }
            catch (UserFriendlyException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { message = "Erro ao buscar reservas pendentes." });
            }
        }

        private int CurrentUserId()
        {
            var claim = User.FindFirst(ClaimTypes.NameIdentifier) ?? User.FindFirst("sub");
            return claim is not null && int.TryParse(claim.Value, out var id) ? id : 0;
        }
    }
}
