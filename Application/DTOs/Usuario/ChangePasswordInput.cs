using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Usuario
{
    public class ChangePasswordInput
    {
        public string Password { get; set; }
        public int UserId { get; set; }
    }
}
