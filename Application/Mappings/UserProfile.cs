using Application.DTOs.User;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<Usuario, UserDto>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Nome))
                .ForMember(d => d.Phone, o => o.MapFrom(s => s.Telefone))
                .ReverseMap()
                .ForMember(d => d.Nome, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.Telefone, o => o.MapFrom(s => s.Phone));
        }
    }
}
