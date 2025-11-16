using Application.DTOs.Authentication;
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
        public async Task<RegisterResponse> Register([FromBody] RegisterRequest dto)
        {
            var result = await _authService.RegisterAsync(dto);
            return result;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<AuthenticationResponse> Login([FromBody] LoginRequest dto)
        {
            return await _authService.LoginAsync(dto);
        }
    }
}
