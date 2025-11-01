using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
    public class User : EntidadeRastreadaComum
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public ERole Role { get; set; }
        public string CPF { get; set; } = string.Empty;
        public bool IsActive { get; set; }

        public int CondominiumId { get; set; }
        public Condominium Condominium { get; set; }

        public ICollection<UnitOccupation> Occupations { get; set; } = new List<UnitOccupation>();
    }
}
