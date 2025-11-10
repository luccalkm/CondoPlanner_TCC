using Application.DTOs.Address;
using Application.DTOs.Endereco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IViaCepService
    {
        Task<AddressDto?> GetAddressByCepAsync(string cep);
    }
}
