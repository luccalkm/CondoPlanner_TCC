using Application.DTOs.Address;

namespace Application.Interfaces
{
    public interface IAddressLookupService
    {
        Task<AddressDto?> LookupAsync(string cep);
    }
}
