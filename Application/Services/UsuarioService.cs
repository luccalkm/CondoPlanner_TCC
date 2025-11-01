//using Application.Interfaces;
//using Domain.Entities;

//namespace Application.Services
//{
//    public class UsuarioService
//    {
//        private readonly IRepositorio<Usuario> _repositorio;

//        public UsuarioService(IRepositorio<Usuario> repositorio)
//        {
//            _repositorio = repositorio;
//        }

//        public async Task<IEnumerable<Usuario>> ObterTodosAsync()
//        {
//            return await _repositorio.ObterTodosAsync();
//        }

//        public async Task<Usuario?> ObterPorIdAsync(int id)
//        {
//            return await _repositorio.ObterPorIdAsync(id);
//        }

//        public async Task<Usuario> CriarAsync(Usuario usuario)
//        {
//            await _repositorio.AdicionarAsync(usuario);
//            await _repositorio.SalvarAlteracoesAsync();

//            return usuario;
//        }

//        public async Task<bool> AtualizarAsync(int id, Usuario usuarioAtualizado)
//        {
//            var existente = await _repositorio.ObterPorIdAsync(id);
//            if (existente == null) return false;

//            existente.Nome = usuarioAtualizado.Nome;
//            existente.Email = usuarioAtualizado.Email;
//            existente.Telefone = usuarioAtualizado.Telefone;
//            existente.TipoUsuario = usuarioAtualizado.TipoUsuario;
//            existente.Ativo = usuarioAtualizado.Ativo;
//            existente.Cpf = usuarioAtualizado.Cpf;
//            existente.CondominioId = usuarioAtualizado.CondominioId;

//            _repositorio.Atualizar(existente);
//            await _repositorio.SalvarAlteracoesAsync();
//            return true;
//        }

//        public async Task<bool> RemoverAsync(int id)
//        {
//            var existente = await _repositorio.ObterPorIdAsync(id);
//            if (existente == null) return false;

//            _repositorio.Remover(existente);
//            await _repositorio.SalvarAlteracoesAsync();
//            return true;
//        }
//    }
//}
