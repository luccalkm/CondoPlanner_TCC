using Application.DTOs.Address;
using Application.DTOs.Endereco;
using Application.Interfaces;
using Domain.Entities;
using System.Net;

namespace Application.Services
{
    public class AddressLookupService : IAddressLookupService
    {
        private readonly IViaCepService _viaCepService;

        public AddressLookupService(IViaCepService viaCepService)
        {
            _viaCepService = viaCepService;
        }

        public async Task<AddressDto?> LookupAsync(string cep)
        {
            return await _viaCepService.GetAddressByCepAsync(cep);
        }
    }
}
