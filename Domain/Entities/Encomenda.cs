using Domain.Enums;

namespace Domain.Entities
{
    public class Encomenda
    {
        public int Id { get; set; }
        public string Transportadora { get; set; } = string.Empty;
        public DateTime DataChegada { get; set; }
        public EStatusEncomenda Status { get; set; }
        public string Observacoes { get; set; } = string.Empty;
        public DateTime? DataRetirada { get; set; }
        public string NomeRetirante { get; set; } = string.Empty;

        public int CondominioId { get; set; }
        public Condominio Condominio { get; set; } = null!;

        public int VinculoResidencialId { get; set; }
        public VinculoResidencial VinculoResidencial { get; set; } = null!;
    }
}
