using Domain.Common;
using Domain.Enums;
using System;

namespace Domain.Entities
{
    public class VinculoResidencial : EntidadeRastreadaComum
    {
        public ETipoOcupacao TipoOcupacao { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime? DataFim { get; set; }
        public bool Ativo { get; set; }


        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; } = null!;
        public int ApartamentoId { get; set; }
        public Apartamento Apartamento { get; set; } = null!;
        public ICollection<Reserva> Reservas { get; set; } = new List<Reserva>();
        public ICollection<Encomenda> Encomendas { get; set; } = new List<Encomenda>();
    }
}
