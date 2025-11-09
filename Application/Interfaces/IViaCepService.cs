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
        Task<EnderecoDto?> GetAddressByCepAsync(string cep);
    }
}
