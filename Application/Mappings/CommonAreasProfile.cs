using Application.DTOs.CommonArea;
using AutoMapper;
using Domain.Entities;

namespace Application.Mappings
{
    public class CommonAreasProfile : Profile
    {
        public CommonAreasProfile()
        {
            CreateMap<AreaComumFoto, CommonAreaPhotoDto>()
                .ForMember(d => d.ContentType, o => o.MapFrom(s => s.TipoConteudo))
                .ForMember(d => d.OriginalFileName, o => o.MapFrom(s => s.NomeArquivoOriginal))
                .ForMember(d => d.OriginalSize, o => o.MapFrom(s => s.TamanhoOriginal))
                .ForMember(d => d.HashSha256, o => o.MapFrom(s => s.HashSha256))
                .ForMember(d => d.Base64Data, o => o.Ignore());

            CreateMap<AreaComum, CommonAreaDto>()
                .ForMember(d => d.CondominiumId, o => o.MapFrom(s => s.CondominioId))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Nome))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Descricao))
                .ForMember(d => d.Type, o => o.MapFrom(s => s.Tipo))
                .ForMember(d => d.Capacity, o => o.MapFrom(s => s.Capacidade))
                .ForMember(d => d.OpeningTime, o => o.MapFrom(s => s.HoraAbertura))
                .ForMember(d => d.ClosingTime, o => o.MapFrom(s => s.HoraFechamento))
                .ForMember(d => d.MaxDuration, o => o.MapFrom(s => s.DuracaoMaxima))
                .ForMember(d => d.Available, o => o.MapFrom(s => s.Disponivel))
                .ForMember(d => d.RequiresApproval, o => o.MapFrom(s => s.RequerAprovacao))
                .ForMember(d => d.AvailableDays, o => o.MapFrom(s => s.DiasDisponiveis))
                .ForMember(d => d.Notes, o => o.MapFrom(s => s.Observacoes))
                .ForMember(d => d.Photos, o => o.MapFrom(s => s.Fotos));

            CreateMap<UpsertCommonAreaInput, AreaComum>()
                .ForMember(d => d.Nome, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.Descricao, o => o.MapFrom(s => s.Description))
                .ForMember(d => d.Tipo, o => o.MapFrom(s => s.Type))
                .ForMember(d => d.Capacidade, o => o.MapFrom(s => s.Capacity))
                .ForMember(d => d.HoraAbertura, o => o.MapFrom(s => s.OpeningTime))
                .ForMember(d => d.HoraFechamento, o => o.MapFrom(s => s.ClosingTime))
                .ForMember(d => d.DuracaoMaxima, o => o.MapFrom(s => s.MaxDuration))
                .ForMember(d => d.Disponivel, o => o.MapFrom(s => s.Available))
                .ForMember(d => d.RequerAprovacao, o => o.MapFrom(s => s.RequiresApproval))
                .ForMember(d => d.DiasDisponiveis, o => o.MapFrom(s => s.AvailableDays))
                .ForMember(d => d.Observacoes, o => o.MapFrom(s => s.Notes))
                .ForMember(d => d.CondominioId, o => o.MapFrom(s => s.CondominiumId))
                .ForMember(d => d.Fotos, o => o.Ignore());
        }
    }
}