using Application.Dtos;
using Application.Interfaces;
using Domain.Entities;

namespace Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IRepositorio<Usuario> _usuarioRepo;
        private readonly ITokenService _tokenService;

        public AuthService(IRepositorio<Usuario> usuarioRepo, ITokenService tokenService)
        {
            _usuarioRepo = usuarioRepo;
            _tokenService = tokenService;
        }

        public async Task<RespostaAutenticacao?> LoginAsync(RequisicaoLogin requisicao)
        {
            var usuario = await _usuarioRepo.PrimeiroOuPadraoAsync(u => u.Email == requisicao.Email);

            if (!LoginValido(usuario, requisicao.Senha))
            {
                return new RespostaAutenticacao
                {
                    Sucesso = false,
                    Erro = "Não foi possível efetuar login com as credenciais informadas. Revise-as e tente novamente."
                };
            }

            var token = _tokenService.GerarToken(usuario);

            return new RespostaAutenticacao
            {
                Token = token,
                Nome = usuario.Nome,
                Email = usuario.Email,
                Sucesso = true
            };
        }

        public async Task<RespostaRegistro> RegistrarAsync(RequisicaoRegistro requisicao)
        {
            var existente = await _usuarioRepo.PrimeiroOuPadraoAsync(u =>
                u.Email == requisicao.Email ||
                u.Cpf == requisicao.Cpf ||
                u.Telefone == requisicao.Telefone);

            if (existente != null)
            {
                return new RespostaRegistro
                {
                    Sucesso = false,
                    Mensagem = "Dados cadastrais já utilizados. Por favor, analise as informações e tente novamente."
                };
            }

            // TODO: Tratar senha

            var novo = new Usuario
            {
                Nome = requisicao.Nome,
                Email = requisicao.Email,
                Telefone = requisicao.Telefone,
                Senha = requisicao.Senha, // TODO: hash
                Cpf = requisicao.Cpf,
            };

            await _usuarioRepo.AdicionarAsync(novo);
            await _usuarioRepo.SalvarAlteracoesAsync();

            return new RespostaRegistro
            {
                Sucesso = true,
                Mensagem = "Usuário cadastrado com sucesso."
            };
        }
    
        private bool LoginValido(Usuario usuario, string senhaEntrada)
        {
            return usuario is not null && SenhaValida(usuario.Senha, senhaEntrada);
        }

        private bool SenhaValida(string senhaUsuario, string senhaEntrada)
        {
            // TODO: Validar senha corretamente
            return senhaUsuario.Equals(senhaEntrada);
        }
    }
}
