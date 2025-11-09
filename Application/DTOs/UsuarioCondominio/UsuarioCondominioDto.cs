using Application.DTOs.Usuario;
using Domain.Enums;
using System;

namespace Application.DTOs.Condominium
{
    public class UsuarioCondominioDto
    {
        public int UsuarioId { get; set; }
        public int CondominioId { get; set; }
        public ETipoUsuario TipoUsuario { get; set; }
        public bool Ativo { get; set; }
        public DateTime DataInicio { get; set; }

        public UsuarioDto Usuario { get; set; }
        public CondominioDto Condominio { get; set; }
    }
}
