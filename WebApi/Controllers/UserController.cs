using Application.DTOs.User;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Exceptions;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Retorna os dados do usuário logado ou de um ID específico.
        /// </summary>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<UserDto>> GetUserById(int id)
        {
            var result = await _userService.GetUserByIdAsync(id);
            return Ok(result);
        }

        /// <summary>
        /// Edita os dados do usuário.
        /// </summary>
        [HttpPut]
        public async Task<ActionResult<UserDto>> EditUser([FromBody] UserDto dto)
        {
            var result = await _userService.EditUserAsync(dto);
            return Ok(result);
        }

        /// <summary>
        /// Altera a senha do usuário.
        /// </summary>
        [HttpPost("ChangePassword")]
        public async Task<ActionResult> ChangeUserPassword([FromBody] ChangePasswordInput input)
        {
            await _userService.ChangeUserPasswordAsync(input);
            return Ok(new { message = "Senha alterada com sucesso." });
        }
    }
}
