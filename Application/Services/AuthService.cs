using Application.Dtos;
using Application.Interfaces;
using Domain.Entities;
using Shared.Helpers;

namespace Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IRepository<Usuario> _userRepo;
        private readonly ITokenService _tokenService;

        public AuthService(IRepository<Usuario> usuarioRepo, ITokenService tokenService)
        {
            _userRepo = usuarioRepo;
            _tokenService = tokenService;
        }

        public async Task<AuthenticationResponse?> LoginAsync(LoginRequest request)
        {
            var user = await _userRepo.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (!IsLoginValid(user, request.Senha))
            {
                return new AuthenticationResponse
                {
                    Sucesso = false,
                    Erro = "Não foi possível efetuar login com as credenciais informadas. Revise-as e tente novamente."
                };
            }

            var token = _tokenService.GenerateToken(user);

            return new AuthenticationResponse
            {
                Token = token,
                Nome = user.Nome,
                Email = user.Email,
                Sucesso = true
            };
        }

        public async Task<RegisterResponse> RegisterAsync(RegisterRequest request)
        {
            var existente = await _userRepo.FirstOrDefaultAsync(u =>
                u.Email == request.Email ||
                u.Cpf == request.Cpf ||
                u.Telefone == request.Telefone);

            if (existente != null)
            {
                return new RegisterResponse
                {
                    Sucesso = false,
                    Mensagem = "Dados cadastrais já utilizados. Por favor, analise as informações e tente novamente."
                };
            }

            var senhaHash = PasswordHasherHelper.HashPassword(request.Senha);

            var novo = new Usuario
            {
                Nome = request.Nome,
                Email = request.Email,
                Telefone = request.Telefone,
                Senha = senhaHash,
                Cpf = request.Cpf,
            };

            await _userRepo.AddAsync(novo);
            await _userRepo.SaveChangesAsync();

            return new RegisterResponse
            {
                Sucesso = true,
                Mensagem = "Usuário cadastrado com sucesso."
            };
        }

        private bool IsLoginValid(Usuario? user, string inputPassword)
        {
            return user is not null && PasswordHasherHelper.VerifyPassword(inputPassword, user.Senha);
        }
    }
}
