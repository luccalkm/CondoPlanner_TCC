using Domain.Common;

namespace Domain.Entities
{
    public class Condominium : EntidadeRastreadaComum
    {
        public string Name { get; set; } = string.Empty;
        public string CNPJ { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public ICollection<Bloco> Blocks { get; set; } = new List<Bloco>();
        public ICollection<User> Users { get; set; } = new List<User>();
    }

}
