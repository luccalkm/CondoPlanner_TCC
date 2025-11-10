using Application.DTOs.Address;
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
            CreateMap<Endereco, AddressDto>()
                .ForMember(d => d.Street, o => o.MapFrom(s => s.Logradouro))
                .ForMember(d => d.Number, o => o.MapFrom(s => s.Numero))
                .ForMember(d => d.Complement, o => o.MapFrom(s => s.Complemento))
                .ForMember(d => d.District, o => o.MapFrom(s => s.Bairro))
                .ForMember(d => d.City, o => o.MapFrom(s => s.Cidade))
                .ForMember(d => d.State, o => o.MapFrom(s => s.Estado))
                .ForMember(d => d.ZipCode, o => o.MapFrom(s => s.Cep))
                .ForMember(d => d.Country, o => o.MapFrom(s => s.Pais))
                .ReverseMap();

            CreateMap<UsuarioCondominio, UserCondominiumDto>()
                .ForMember(d => d.UserId, o => o.MapFrom(s => s.UsuarioId))
                .ForMember(d => d.CondominiumId, o => o.MapFrom(s => s.CondominioId))
                .ForMember(d => d.UserType, o => o.MapFrom(s => s.TipoUsuario))
                .ForMember(d => d.Active, o => o.MapFrom(s => s.Ativo))
                .ForMember(d => d.CreationTime, o => o.MapFrom(s => s.DataCriacao))
                .ForMember(d => d.EndDate, o => o.MapFrom(s => s.DataInativacao))
                .ReverseMap();
        }
    }
}
