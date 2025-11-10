using Application.DTOs.Address;
using Application.DTOs.Endereco;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AddressController : ControllerBase
    {
        private readonly AddressLookupService _addressLookupService;

        public AddressController(AddressLookupService addressLookupService)
        {
            _addressLookupService = addressLookupService;
        }

        /// <summary>
        /// Retorna o endereço correspondente a um CEP.
        /// </summary>
        /// <param name="cep">CEP no formato 00000000 ou 00000-000</param>
        [HttpGet("{cep}")]
        public async Task<ActionResult<AddressDto>> GetAddress(string cep)
        {
            if (string.IsNullOrWhiteSpace(cep))
                return BadRequest(new { message = "O CEP é obrigatório." });

            var normalizedCep = cep.Replace("-", "").Trim();

            var address = await _addressLookupService.LookupAsync(normalizedCep);

            if (address is null)
                return NotFound(new { message = "CEP não encontrado." });

            return Ok(address);
        }
    }
}
