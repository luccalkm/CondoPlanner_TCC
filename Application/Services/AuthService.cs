using Application.DTOs.Authentication;
using Application.DTOs.User;
using Application.DTOs.User;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Shared.Helpers;

namespace Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IRepository<Usuario> _userRepo;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AuthService(IMapper mapper, IRepository<Usuario> userRepo, ITokenService tokenService)
        {
            _userRepo = userRepo;
            _tokenService = tokenService;
            _mapper = mapper;
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
                Usuario = _mapper.Map<UserDto>(user),
                Token = token,
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
