using Domain.Common;
using Domain.Enums;
using System;

namespace Domain.Entities
{
    public class Reserva : EntidadeRastreadaComum
    {
        public string Finalidade { get; set; } = string.Empty;
        public int NumeroConvidados { get; set; }
        public DateTime DataInicio { get; set; }           
        public DateTime DataTermino { get; set; }           
        public EStatusReserva Status { get; set; }
        public string? Observacoes { get; set; }

        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; } = null!;

        public int AreaComumId { get; set; }
        public AreaComum AreaComum { get; set; } = null!;
    }
}
