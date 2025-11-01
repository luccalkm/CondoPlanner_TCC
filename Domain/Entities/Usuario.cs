using Domain.Common;
using Domain.Enums;
using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
        public ETipoUsuario TipoUsuario { get; set; }
        public string Cpf { get; set; } = string.Empty;
        public bool Ativo { get; set; }


        public int CondominioId { get; set; }
        public Condominio Condominio { get; set; } = null!;
        public ICollection<VinculoResidencial> VinculosResidenciais { get; set; } = new List<VinculoResidencial>();
    }
}
