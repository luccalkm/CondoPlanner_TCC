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
            CreateMap<Condominio, CondominiumDto>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Nome))
                .ForMember(d => d.Address, o => o.MapFrom(s => s.Endereco))
                .ForMember(d => d.Blocks, o => o.MapFrom(s => s.Blocos))
                .ReverseMap()
                .ForMember(d => d.Nome, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.Endereco, o => o.MapFrom(s => s.Address))
                .ForMember(d => d.Blocos, o => o.MapFrom(s => s.Blocks));

            CreateMap<Bloco, BlockDto>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Nome))
                .ForMember(d => d.Apartments, o => o.MapFrom(s => s.Apartamentos))
                .ReverseMap()
                .ForMember(d => d.Nome, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.Apartamentos, o => o.MapFrom(s => s.Apartments));

            CreateMap<Apartamento, ApartmentDto>()
                .ForMember(d => d.Number, o => o.MapFrom(s => s.Numero))
                .ForMember(d => d.FloorNumber, o => o.MapFrom(s => s.Andar))
                .ForMember(d => d.BlockId, o => o.MapFrom(s => s.BlocoId))
                .ReverseMap()
                .ForMember(d => d.Numero, o => o.MapFrom(s => s.Number))
                .ForMember(d => d.Andar, o => o.MapFrom(s => s.FloorNumber))
                .ForMember(d => d.BlocoId, o => o.MapFrom(s => s.BlockId));

            CreateMap<ApartmentInputDto, Apartamento>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Id.GetValueOrDefault()))
                .ForMember(d => d.Numero, o => o.MapFrom(s => s.Number))
                .ForMember(d => d.Andar, o => o.MapFrom(s => s.FloorNumber))
                .ForMember(d => d.BlocoId, o => o.Ignore());

            CreateMap<BlockInputDto, Bloco>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Id.GetValueOrDefault()))
                .ForMember(d => d.Nome, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.Apartamentos, o => o.MapFrom(s => s.Apartments))
                .ForMember(d => d.CondominioId, o => o.Ignore())
                .ForMember(d => d.Condominio, o => o.Ignore());

            CreateMap<CreateOrEditCondominiumInput, Condominio>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.GetValueOrDefault()))
                .ForMember(dest => dest.Nome, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Cnpj, opt => opt.MapFrom(src => src.Cnpj))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Endereco, opt => opt.Ignore()) 
                .ForMember(dest => dest.EnderecoId, opt => opt.Ignore())
                .ForMember(dest => dest.Blocos, opt => opt.Ignore())
                .ForMember(dest => dest.AreasComuns, opt => opt.Ignore())
                .ForMember(dest => dest.Encomendas, opt => opt.Ignore())
                .ForMember(dest => dest.VinculosUsuarios, opt => opt.Ignore());
        }
    }
}
