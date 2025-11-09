using Application.DTOs.Condominium;
using Application.DTOs.Endereco;
using AutoMapper;
using Domain.Entities;
using Domain.Entities.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Mappings
{
    public class CommonEntitiesProfile : Profile
    {
        public CommonEntitiesProfile()
        {
            CreateMap<EnderecoDto, Endereco>().ReverseMap();
            CreateMap<UsuarioCondominio, UsuarioCondominioDto>().ReverseMap();
        }
    }
}
