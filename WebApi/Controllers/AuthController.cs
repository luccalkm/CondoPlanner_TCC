using Application.Dtos;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("registrar")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RequisicaoRegistro dto)
        {
            var resultado = await _authService.RegistrarAsync(dto);
            return Ok(resultado);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] RequisicaoLogin dto)
        {
            var resposta = await _authService.LoginAsync(dto);
            if (resposta == null)
                return Unauthorized("Credenciais inválidas.");
            return Ok(resposta);
        }
    }
}
