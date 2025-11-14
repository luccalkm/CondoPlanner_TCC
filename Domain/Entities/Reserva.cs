using Domain.Common;
using Domain.Enums;
using System;

namespace Domain.Entities
{
    public class Reserva : EntidadeRastreadaComum
    {
        public string Finalidade { get; set; } = string.Empty;
        public DateTime Data { get; set; }
        public int NumeroConvidados { get; set; }
        public DateTime HoraInicio { get; set; }
        public DateTime HoraTermino { get; set; }
        public EStatusReserva Status { get; set; }
        public string Observacoes { get; set; } = string.Empty;

        public int VinculoResidencialId { get; set; }
        public VinculoResidencial VinculoResidencial { get; set; } = null!;
        public int AreaComumId { get; set; }
        public AreaComum AreaComum { get; set; } = null!;
    }
}
