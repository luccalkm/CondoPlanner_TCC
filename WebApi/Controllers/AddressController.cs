using Application.DTOs.Endereco;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AddressController : ControllerBase
    {
        private readonly AddressLookupService _addressLookupService;

        public AddressController(AddressLookupService addressLookupService)
        {
            _addressLookupService = addressLookupService;
        }

        [HttpPost]
        public async Task<ActionResult<EnderecoDto>> GetAddress(GetCepInput input)
        {
            var address = await _addressLookupService.LookupAsync(input.CEP);

            if (address == null)
                return NotFound(new { message = "CEP não encontrado." });

            return Ok(address);
        }
    }
}
