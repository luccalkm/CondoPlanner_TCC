using Application.DTOs.ResidentialLink;
using AutoMapper;
using Domain.Entities;

namespace Application.Profiles
{
    public class ResidentialLinkProfile : Profile
    {
        public ResidentialLinkProfile()
        {
            CreateMap<VinculoResidencial, ResidentialLinkDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
                .ForMember(d => d.UsuarioId, o => o.MapFrom(s => s.UsuarioId))
                .ForMember(d => d.ApartmentId, o => o.MapFrom(s => s.ApartamentoId))
                .ForMember(d => d.ApartmentNumber, o => o.MapFrom(s => s.Apartamento.Numero))
                .ForMember(d => d.BlockId, o => o.MapFrom(s => s.Apartamento.BlocoId))
                .ForMember(d => d.BlockName, o => o.MapFrom(s => s.Apartamento.Bloco.Nome))
                .ForMember(d => d.CondominiumId, o => o.MapFrom(s => s.Apartamento.Bloco.CondominioId))
                .ForMember(d => d.CondominiumName, o => o.MapFrom(s => s.Apartamento.Bloco.Condominio.Nome))
                .ForMember(d => d.OccupationType, o => o.MapFrom(s => s.TipoOcupacao))
                .ForMember(d => d.Active, o => o.MapFrom(s => s.Ativo))
                .ForMember(d => d.StartDate, o => o.MapFrom(s => s.DataInicio))
                .ForMember(d => d.EndDate, o => o.MapFrom(s => s.DataFim))
                .ForMember(d => d.Status, o => o.MapFrom(s => s.Status))
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Usuario.Nome));
        }
    }
}