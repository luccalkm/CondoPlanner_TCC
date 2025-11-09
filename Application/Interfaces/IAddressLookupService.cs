using Application.DTOs.Endereco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IAddressLookupService
    {
        Task<EnderecoDto?> LookupAsync(string cep);
    }
}
