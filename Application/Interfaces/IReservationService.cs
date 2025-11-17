using Application.DTOs.Reservation;

namespace Application.Interfaces
{
    public interface IReservationService
    {
        Task<List<ReservationDto>> GetByAreaAsync(int areaId, DateTime start, DateTime end);
        Task<int> CreateAsync(CreateReservationInput input, int userId);
        Task CancelAsync(int reservationId, int userId);
        Task ApproveOrRejectAsync(ApproveOrRejectReservationInput input);
        Task<List<ReservationDto>> GetPendingReservationsAsync(int condominiumId);
    }
}
