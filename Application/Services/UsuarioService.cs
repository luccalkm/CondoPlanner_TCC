//using Application.Interfaces;
//using Domain.Entities;

//namespace Application.Services
//{
//    public class UsuarioService
//    {
//        private readonly IRepository<Usuario> _repositorio;

//        public UsuarioService(IRepository<Usuario> repositorio)
//        {
//            _repositorio = repositorio;
//        }

//        public async Task<IEnumerable<Usuario>> GetAllAsync()
//        {
//            return await _repositorio.GetAllAsync();
//        }

//        public async Task<Usuario?> GetByIdAsync(int id)
//        {
//            return await _repositorio.GetByIdAsync(id);
//        }

//        public async Task<Usuario> CriarAsync(Usuario usuario)
//        {
//            await _repositorio.AddAsync(usuario);
//            await _repositorio.SaveChangesAsync();

//            return usuario;
//        }

//        public async Task<bool> AtualizarAsync(int id, Usuario usuarioAtualizado)
//        {
//            var existente = await _repositorio.GetByIdAsync(id);
//            if (existente == null) return false;

//            existente.Nome = usuarioAtualizado.Nome;
//            existente.Email = usuarioAtualizado.Email;
//            existente.Telefone = usuarioAtualizado.Telefone;
//            existente.TipoUsuario = usuarioAtualizado.TipoUsuario;
//            existente.Ativo = usuarioAtualizado.Ativo;
//            existente.Cpf = usuarioAtualizado.Cpf;
//            existente.CondominioId = usuarioAtualizado.CondominioId;

//            _repositorio.Update(existente);
//            await _repositorio.SaveChangesAsync();
//            return true;
//        }

//        public async Task<bool> RemoverAsync(int id)
//        {
//            var existente = await _repositorio.GetByIdAsync(id);
//            if (existente == null) return false;

//            _repositorio.Delete(existente);
//            await _repositorio.SaveChangesAsync();
//            return true;
//        }
//    }
//}
