using Domain.Enums;
using System;

namespace Application.DTOs.Condominium
{
    public class UpsertUserCondominiumInput
    {
        public int CondominiumId { get; set; }
        public int UserId { get; set; }
        public ETipoUsuario UserType { get; set; } = ETipoUsuario.MORADOR;
        public bool Active { get; set; } = true;
        public DateTime? StartDate { get; set; }
    }
}
