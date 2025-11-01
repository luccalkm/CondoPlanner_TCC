using Application.Dtos;

namespace Application.Interfaces
{
    public interface IAuthService
    {
        Task<RespostaAutenticacao?> LoginAsync(RequisicaoLogin requisicao);
        Task<RespostaRegistro> RegistrarAsync(RequisicaoRegistro requisicao);
    }
}
