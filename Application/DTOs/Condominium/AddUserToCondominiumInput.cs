using Domain.Enums;
using System;

namespace Application.DTOs.Condominium
{
    public class AddUserToCondominiumInput
    {
        public int CondominioId { get; set; }
        public int UsuarioId { get; set; }

        public ETipoUsuario TipoUsuario { get; set; } = ETipoUsuario.MORADOR;
        public bool Ativo { get; set; } = true;
        public DateTime? DataInicio { get; set; }
    }
}
