using Application.DTOs.Condominium;
using AutoMapper;
using Domain.Entities;
using Domain.Entities.Domain.Entities;

namespace Application.Profiles
{
    public class CondominiumProfile : Profile
    {

        public CondominiumProfile()
        {
            CreateMap<Condominio, CondominioDto>().ReverseMap();

            CreateMap<CreateOrEditCondominiumInput, Condominio>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.HasValue ? src.Id.Value : 0))
                .ForMember(dest => dest.Endereco, opt => opt.Ignore())
                .ForMember(dest => dest.VinculosUsuarios, opt => opt.Ignore())
                .ForMember(dest => dest.Blocos, opt => opt.Ignore())
                .ForMember(dest => dest.AreasComuns, opt => opt.Ignore())
                .ForMember(dest => dest.Encomendas, opt => opt.Ignore());
        }
    }
}
