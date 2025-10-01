using Domain.Common;

namespace Domain.Entities
{
    public class Block : CommonTrackedEntity
    {
        public string BlockName { get; set; } = string.Empty;

        public int CondominiumId { get; set; }
        public Condominium Condominium { get; set; }

        public ICollection<Unit> Units { get; set; } = new List<Unit>();
        public ICollection<CommonArea> CommonAreas { get; set; } = new List<CommonArea>();
    }

}
