using Application.DTOs.Package;
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
    public class PackageController : ControllerBase
    {
        private readonly IPackageService _service;

        public PackageController(IPackageService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePackageInput input)
        {
            try
            {
                var id = await _service.CreateAsync(input, CurrentUserId());
                return Ok(new { id });
            }
            catch (UserFriendlyException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { message = "Erro ao criar encomenda." });
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdatePackageInput input)
        {
            try
            {
                await _service.UpdateAsync(id, input, CurrentUserId());
                return Ok();
            }
            catch (UserFriendlyException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { message = "Erro ao atualizar encomenda." });
            }
        }

        [HttpPatch("{id:int}/UpdateStatus")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdatePackageStatusInput input)
        {
            if (input.PackageId != 0 && input.PackageId != id)
                return BadRequest(new { message = "Conflito de identificadores." });

            input.PackageId = id;

            try
            {
                await _service.UpdateStatusAsync(input, CurrentUserId());
                return Ok();
            }
            catch (UserFriendlyException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { message = "Erro ao atualizar status da encomenda." });
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _service.DeleteAsync(id, CurrentUserId());
                return Ok();
            }
            catch (UserFriendlyException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { message = "Erro ao deletar encomenda." });
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<PackageDto?>> GetById(int id)
        {
            try
            {
                var dto = await _service.GetByIdAsync(id, CurrentUserId());
                if (dto is null) return NotFound();
                return Ok(dto);
            }
            catch (UserFriendlyException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { message = "Erro ao buscar encomenda." });
            }
        }

        [HttpGet("Condominium/{condominiumId:int}")]
        public async Task<ActionResult<List<PackageDto>>> ListByCondominium(int condominiumId)
        {
            try
            {
                var list = await _service.ListByCondominiumAsync(condominiumId, CurrentUserId());
                return Ok(list);
            }
            catch (UserFriendlyException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { message = "Erro ao listar encomendas do condomínio." });
            }
        }

        [HttpGet("Link/{residentialLinkId:int}")]
        public async Task<ActionResult<List<PackageDto>>> ListByResidentialLink(int residentialLinkId)
        {
            try
            {
                var list = await _service.ListByResidentialLinkAsync(residentialLinkId, CurrentUserId());
                return Ok(list);
            }
            catch (UserFriendlyException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { message = "Erro ao listar encomendas do vínculo." });
            }
        }

        private int CurrentUserId()
        {
            var claim = User.FindFirst(ClaimTypes.NameIdentifier) ?? User.FindFirst("sub");
            return claim is not null && int.TryParse(claim.Value, out var id) ? id : 0;
        }
    }
}