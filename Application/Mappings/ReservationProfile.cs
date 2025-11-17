using Application.DTOs.Reservation;
using AutoMapper;
using Domain.Entities;

namespace Application.Mappings
{
    public class ReservationProfile : Profile
    {
        public ReservationProfile()
        {
            CreateMap<Reserva, ReservationDto>()
                .ForMember(d => d.AreaId, o => o.MapFrom(s => s.AreaComumId))
                .ForMember(d => d.CondominiumId, o => o.MapFrom(s => s.AreaComum.CondominioId))
                .ForMember(d => d.VinculoResidencialId, o => o.MapFrom(s => s.VinculoResidencialId))
                .ForMember(d => d.Purpose, o => o.MapFrom(s => s.Finalidade))
                .ForMember(d => d.Date, o => o.MapFrom(s => s.DataInicio.Date))
                .ForMember(d => d.StartTime, o => o.MapFrom(s => s.DataInicio.TimeOfDay))
                .ForMember(d => d.EndTime, o => o.MapFrom(s => s.DataFim.TimeOfDay))
                .ForMember(d => d.Guests, o => o.MapFrom(s => s.NumeroConvidados))
                .ForMember(d => d.Status, o => o.MapFrom(s => s.Status))
                .ForMember(d => d.Notes, o => o.MapFrom(s => s.Observacoes))
                .ForMember(d => d.CommonArea, o => o.MapFrom(s => s.AreaComum));

            CreateMap<CreateReservationInput, Reserva>()
                .ForMember(d => d.AreaComumId, o => o.MapFrom(s => s.AreaId))
                .ForMember(d => d.Finalidade, o => o.MapFrom(s => s.Purpose))
                .ForMember(d => d.DataInicio, o => o.MapFrom(s => s.StartDate))
                .ForMember(d => d.DataFim, o => o.MapFrom(s => s.EndDate))
                .ForMember(d => d.NumeroConvidados, o => o.MapFrom(s => s.Guests))
                .ForMember(d => d.Observacoes, o => o.MapFrom(s => s.Notes))
                .ForMember(d => d.Status, o => o.Ignore())
                .ForMember(d => d.VinculoResidencialId, o => o.Ignore());
        }
    }
}
