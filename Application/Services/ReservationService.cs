using Application.DTOs.Reservation;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Shared.Exceptions;

namespace Application.Services
{
    public class ReservationService : IReservationService
    {
        private readonly IRepository<Reserva> _reservationRepo;
        private readonly IRepository<AreaComum> _areaRepo;
        private readonly IRepository<VinculoResidencial> _vinculoRepo;
        private readonly IRepository<UsuarioCondominio> _userCondRepo;
        private readonly IMapper _mapper;

        public ReservationService(
            IRepository<Reserva> reservationRepo,
            IRepository<AreaComum> areaRepo,
            IRepository<VinculoResidencial> vinculoRepo,
            IRepository<UsuarioCondominio> userCondRepo,
            IMapper mapper)
        {
            _reservationRepo = reservationRepo;
            _areaRepo = areaRepo;
            _vinculoRepo = vinculoRepo;
            _userCondRepo = userCondRepo;
            _mapper = mapper;
        }

        public async Task<List<ReservationDto>> GetByAreaAsync(int areaId, DateTime start, DateTime end)
        {
            var startDate = start.Date;
            var endDate = end.Date;

            var query = _reservationRepo
                .Include(r => r.AreaComum)
                .Where(r => r.AreaComumId == areaId && r.Data >= startDate && r.Data <= endDate)
                .ToList();

            return query.Select(_mapper.Map<ReservationDto>).ToList();
        }

        public async Task<int> CreateAsync(CreateReservationInput input, int userId)
        {
            var startDateTime = input.StartDate;
            var endDateTime = input.EndDate;

            if (endDateTime <= startDateTime)
                throw new UserFriendlyException("Período inválido: data/hora final deve ser maior que a inicial.");

            var area = await _areaRepo.GetTrackedAsync(a => a.Id == input.AreaId)
                ?? throw new UserFriendlyException("Área comum não encontrada.");

            if (!area.Disponivel)
                throw new UserFriendlyException("Área indisponível para reservas.");

            if (startDateTime.TimeOfDay < area.HoraAbertura)
                throw new UserFriendlyException("Horário de início antes da abertura da área.");
            if (endDateTime.TimeOfDay > area.HoraFechamento)
                throw new UserFriendlyException("Horário de término após o fechamento da área.");

            var duration = (int)(endDateTime - startDateTime).TotalMinutes;
            if (duration <= 0 || duration > area.DuracaoMaxima)
                throw new UserFriendlyException($"Duração inválida. Máximo permitido: {area.DuracaoMaxima} minutos.");

            if (input.Guests > area.Capacidade)
                throw new UserFriendlyException("Número de convidados excede a capacidade da área.");

            var today = DateTime.UtcNow.Date;
            if (startDateTime.Date < today)
                throw new UserFriendlyException("Não é possível reservar em data passada.");

            if ((startDateTime.Date - today).TotalDays > area.DiasDisponiveis)
                throw new UserFriendlyException("Data desejada fora da janela de agendamento permitida.");

            var vinculo = _vinculoRepo
                .Include("Apartamento", "Apartamento.Bloco")
                .FirstOrDefault(v => v.UsuarioId == userId
                    && v.Ativo
                    && v.DataInicio <= startDateTime.Date
                    && (v.DataFim == null || v.DataFim.Value.Date >= startDateTime.Date)
                    && v.Apartamento.Bloco.CondominioId == area.CondominioId);

            if (vinculo is null)
                throw new UserFriendlyException("Você não possui vínculo residencial ativo neste condomínio para reservar esta área.");

            // Buscar reservas potencialmente conflitantes (dia inicial e dia anterior se atravessa meia-noite)
            var existing = _reservationRepo
                .Include(r => r.AreaComum)
                .Where(r => r.AreaComumId == area.Id && r.Data >= startDateTime.Date.AddDays(-1) && r.Data <= startDateTime.Date)
                .Where(r => r.Status != EStatusReserva.CANCELADO && r.Status != EStatusReserva.REJEITADO)
                .ToList();

            bool overlapping = existing.Any(r =>
            {
                var rStart = r.HoraInicio;
                var rEnd = r.HoraTermino <= r.HoraInicio
                    ? r.HoraTermino.AddDays(1)
                    : r.HoraTermino;
                return DateRangesOverlap(rStart, rEnd, startDateTime, endDateTime);
            });

            if (overlapping)
                throw new UserFriendlyException("Já existe uma reserva nesse período.");

            var entity = _mapper.Map<Reserva>(input);
            entity.VinculoResidencialId = vinculo.Id;
            entity.Status = area.RequerAprovacao ? EStatusReserva.PENDENTE : EStatusReserva.APROVADO;

            await _reservationRepo.AddAsync(entity);
            await _reservationRepo.SaveChangesAsync();
            return entity.Id;
        }

        public async Task CancelAsync(int reservationId, int userId)
        {
            var reserva = await _reservationRepo.GetTrackedAsync(r => r.Id == reservationId)
                ?? throw new UserFriendlyException("Reserva não encontrada.");

            var isOwner = _vinculoRepo
                .Include(v => v.Usuario)
                .Any(v => v.Id == reserva.VinculoResidencialId && v.UsuarioId == userId);

            var area = await _areaRepo.GetTrackedAsync(a => a.Id == reserva.AreaComumId) ?? throw new UserFriendlyException("Área não encontrada.");
            var isAdmin = await _userCondRepo.FirstOrDefaultAsync(uc =>
                uc.UsuarioId == userId &&
                uc.CondominioId == area.CondominioId &&
                (uc.TipoUsuario == ETipoUsuario.ADMINISTRADOR || uc.TipoUsuario == ETipoUsuario.SINDICO)) != null;

            if (!isOwner && !isAdmin)
                throw new UserFriendlyException("Você não tem permissão para cancelar esta reserva.");

            reserva.Status = EStatusReserva.CANCELADO;
            _reservationRepo.Update(reserva);
            await _reservationRepo.SaveChangesAsync();
        }

        public async Task ApproveAsync(int reservationId, int userId, bool approve)
        {
            var reserva = await _reservationRepo.GetTrackedAsync(r => r.Id == reservationId)
                ?? throw new UserFriendlyException("Reserva não encontrada.");

            var area = await _areaRepo.GetTrackedAsync(a => a.Id == reserva.AreaComumId) ?? throw new UserFriendlyException("Área não encontrada.");

            var relation = await _userCondRepo.FirstOrDefaultAsync(uc =>
                uc.UsuarioId == userId &&
                uc.CondominioId == area.CondominioId &&
                (uc.TipoUsuario == ETipoUsuario.ADMINISTRADOR || uc.TipoUsuario == ETipoUsuario.SINDICO));

            if (relation is null)
                throw new UserFriendlyException("Você não tem permissão para aprovar/rejeitar reservas desta área.");

            reserva.Status = approve ? EStatusReserva.APROVADO : EStatusReserva.REJEITADO;
            _reservationRepo.Update(reserva);
            await _reservationRepo.SaveChangesAsync();
        }

        private static bool DateRangesOverlap(DateTime aStart, DateTime aEnd, DateTime bStart, DateTime bEnd)
        {
            return aStart < bEnd && bStart < aEnd;
        }
    }
}
