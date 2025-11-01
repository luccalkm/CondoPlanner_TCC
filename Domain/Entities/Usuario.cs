using Domain.Common;
using Domain.Enums;
using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Usuario : EntidadeRastreadaComum
    {
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
        public string Cpf { get; set; } = string.Empty;

        public ICollection<VinculoResidencial> VinculosResidenciais { get; set; } = new List<VinculoResidencial>();
        public ICollection<UsuarioCondominio> VinculosCondominios { get; set; } = new List<UsuarioCondominio>();
    }
}
