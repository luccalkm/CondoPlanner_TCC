using Domain.Common;
using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class AreaComum : EntidadeRastreadaComum
    {
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public string Tipo { get; set; } = string.Empty;
        public int Capacidade { get; set; }
        public TimeSpan HoraAbertura { get; set; }
        public TimeSpan HoraFechamento { get; set; }
        public int DuracaoMaxima { get; set; }
        public bool Disponivel { get; set; }
        public bool RequerAprovacao { get; set; }
        public int DiasDisponiveis { get; set; }
        public string Observacoes { get; set; } = string.Empty;

        public int CondominioId { get; set; }
        public Condominio Condominio { get; set; } = null!;
        public ICollection<Reserva> Reservas { get; set; } = new List<Reserva>();
    }
}
