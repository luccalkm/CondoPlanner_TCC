using Application.DTOs.Authentication;
using Application.DTOs.Condominium;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CondominiumController : ControllerBase
    {
        private readonly ICondominiumService _condominiumService;

        public CondominiumController(ICondominiumService condominiumService)
        {
            _condominiumService = condominiumService;
        }

        /// <summary>
        /// Cria ou edita um condomínio.
        /// </summary>
        [HttpPost("CreateOrEdit")]
        public async Task<IActionResult> CreateOrEdit([FromBody] CreateOrEditCondominiumInput input)
        {
            if (input == null)
                return BadRequest(new { message = "Os dados do condomínio não podem ser nulos." });

            try
            {
                await _condominiumService.CreateOrEditCondominium(input);
                return Ok(new { message = "Condomínio salvo com sucesso." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Erro ao salvar condomínio: {ex.Message}" });
            }
        }

        /// <summary>
        /// Retorna todos os condomínios nos quais o usuário está vinculado.
        /// </summary>
        [HttpGet("ByUser/{userId:int}")]
        public async Task<IActionResult> GetAllByUser(int userId)
        {
            try
            {
                var condominiums = await _condominiumService.GetAllByUserAsync(userId);
                return Ok(condominiums);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Erro ao buscar condomínios: {ex.Message}" });
            }
        }

        /// <summary>
        /// Adiciona um usuário a um condomínio.
        /// </summary>
        [HttpPost("AddUserToCondominium")]
        public async Task<IActionResult> AddUserToCondominium([FromBody] AddUserToCondominiumInput input)
        {
            if (input == null)
                return BadRequest(new { message = "Os dados enviados são inválidos." });

            try
            {
                await _condominiumService.AddUserToCondominiumAsync(input.CondominioId, input.UsuarioId);
                return Ok(new { message = "Usuário vinculado com sucesso ao condomínio." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Erro ao vincular usuário: {ex.Message}" });
            }
        }

        /// <summary>
        /// Retorna todos os usuários vinculados a um condomínio.
        /// </summary>
        [HttpGet("{condominioId:int}/Users")]
        public async Task<IActionResult> GetUsersFromCondominium(int condominioId)
        {
            try
            {
                var users = await _condominiumService.GetUsersFromCondominiumAsync(condominioId);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Erro ao buscar usuários: {ex.Message}" });
            }
        }
    }
}
