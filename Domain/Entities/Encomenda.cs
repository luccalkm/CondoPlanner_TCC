using Domain.Common;
using Domain.Enums;
using System;

namespace Domain.Entities
{
    public class Encomenda : EntidadeRastreadaComum
    {
        public string Transportadora { get; set; } = string.Empty;
        public DateTime DataChegada { get; set; }
        public EStatusEncomenda Status { get; set; }

        public string? Observacoes { get; set; }
        public DateTime? DataRetirada { get; set; }
        public string? NomeRetirante { get; set; }

        public int CondominioId { get; set; }
        public Condominio Condominio { get; set; } = null!;

        public int? ApartamentoId { get; set; } 
        public Apartamento? Apartamento { get; set; }
    }
}
