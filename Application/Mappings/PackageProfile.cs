using Application.DTOs.Package;
using AutoMapper;
using Domain.Entities;

namespace Application.Mappings
{
    public class PackageProfile : Profile
    {
        public PackageProfile()
        {
            CreateMap<Encomenda, PackageDto>()
                .ForMember(d => d.Carrier, o => o.MapFrom(s => s.Transportadora))
                .ForMember(d => d.ReceivedAt, o => o.MapFrom(s => s.DataChegada))
                .ForMember(d => d.Status, o => o.MapFrom(s => s.Status))
                .ForMember(d => d.Notes, o => o.MapFrom(s => s.Observacoes))
                .ForMember(d => d.PickedUpAt, o => o.MapFrom(s => s.DataRetirada))
                .ForMember(d => d.PickupPersonName, o => o.MapFrom(s => s.NomeRetirante))
                .ForMember(d => d.CondominiumId, o => o.MapFrom(s => s.CondominioId))
                .ForMember(d => d.ResidentialLinkId, o => o.MapFrom(s => s.VinculoResidencialId));

            CreateMap<CreatePackageInput, Encomenda>()
                .ForMember(d => d.Transportadora, o => o.MapFrom(s => s.Carrier))
                .ForMember(d => d.DataChegada, o => o.MapFrom(s => s.ReceivedAt ?? DateTime.UtcNow))
                .ForMember(d => d.Observacoes, o => o.MapFrom(s => s.Notes))
                .ForMember(d => d.CondominioId, o => o.MapFrom(s => s.CondominiumId))
                .ForMember(d => d.VinculoResidencialId, o => o.MapFrom(s => s.ResidentialLinkId))
                .ForMember(d => d.Status, o => o.Ignore())
                .ForMember(d => d.DataRetirada, o => o.Ignore())
                .ForMember(d => d.NomeRetirante, o => o.Ignore());

            CreateMap<UpdatePackageInput, Encomenda>()
                .ForMember(d => d.Transportadora, o => o.MapFrom(s => s.Carrier))
                .ForMember(d => d.Observacoes, o => o.MapFrom(s => s.Notes))
                .ForAllMembers(o => o.Ignore());
        }
    }
}