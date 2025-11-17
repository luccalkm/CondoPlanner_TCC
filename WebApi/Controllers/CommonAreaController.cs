using Application.DTOs.CommonArea;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CommonAreaController : ControllerBase
    {
        private readonly ICommonAreaService _service;

        public CommonAreaController(ICommonAreaService service)
        {
            _service = service;
        }

        [HttpGet("Condominium/{condominiumId:int}")]
        public async Task<ActionResult<List<CommonAreaDto>>> GetByCondominium(int condominiumId)
        {
            var list = await _service.GetByCondominiumAsync(condominiumId);
            return Ok(list);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<CommonAreaDto>> Get(int id)
        {
            var item = await _service.GetByIdAsync(id);
            if (item is null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UpsertCommonAreaInput input)
        {
            if ((input.UserId > 0 && CurrentUserId() != input.UserId) || input is null) return BadRequest("Solicitação inválida.");

            input.UserId = CurrentUserId();

            var id = await _service.CreateAsync(input);
            return Ok(new { id });
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpsertCommonAreaInput input)
        {
            if ((input.UserId > 0 && CurrentUserId() != input.UserId) || id <= 0 || input is null) return BadRequest("Solicitação inválida.");

            input.Id = id;
            input.UserId = CurrentUserId();

            await _service.UpdateAsync(input);
            return Ok();
        }

        [HttpPost("Photos/Upload")]
        public async Task<IActionResult> UploadPhoto([FromBody] UploadCommonAreaPhotoInput req)
        {
            if (req is null) return BadRequest("Solicitação inválida.");
            await _service.UploadPhotoAsync(req, CurrentUserId());
            return Ok(new { message = "Enviado com sucesso." });
        }

        [HttpDelete("Photos/{photoId:int}")]
        public async Task<IActionResult> RemovePhoto(int photoId)
        {
            await _service.RemovePhotoAsync(photoId);
            return Ok();
        }

        private int CurrentUserId()
        {
            var claim = User.FindFirst(ClaimTypes.NameIdentifier) ?? User.FindFirst("sub");
            return claim is not null && int.TryParse(claim.Value, out var id) ? id : 0;
        }
    }
}