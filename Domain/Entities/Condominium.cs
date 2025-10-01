using Domain.Common;

namespace Domain.Entities
{
    public class Condominium : CommonTrackedEntity
    {
        public string Name { get; set; } = string.Empty;
        public string CNPJ { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public ICollection<Block> Blocks { get; set; } = new List<Block>();
        public ICollection<User> Users { get; set; } = new List<User>();
    }

}
