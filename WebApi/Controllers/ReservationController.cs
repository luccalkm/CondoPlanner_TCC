using Application.DTOs.Reservation;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
            if (input is null) return BadRequest("Solicitação inválida.");
            var id = await _service.CreateAsync(input, CurrentUserId());
            return Ok(new { id });
        }

        [HttpPost("{reservationId:int}/Cancel")]
        public async Task<IActionResult> Cancel(int reservationId)
        {
            await _service.CancelAsync(reservationId, CurrentUserId());
            return Ok();
        }

        public class ApproveRequest { public bool Approve { get; set; } }

        [HttpPost("{reservationId:int}/Approve")]
        public async Task<IActionResult> Approve(int reservationId, [FromBody] ApproveRequest req)
        {
            if (req is null) return BadRequest("Solicitação inválida.");
            await _service.ApproveAsync(reservationId, CurrentUserId(), req.Approve);
            return Ok();
        }

        private int CurrentUserId()
        {
            var claim = User.FindFirst(ClaimTypes.NameIdentifier) ?? User.FindFirst("sub");
            return claim is not null && int.TryParse(claim.Value, out var id) ? id : 0;
        }
    }
}
