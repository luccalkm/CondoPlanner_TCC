using Application.Interfaces;
using Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infrastructure.Persistence.Repositories
{
    public class RepositorioBase<T> : IRepositorio<T> where T : class
    {
        private readonly AppDbContext _context;
        private readonly DbSet<T> _dbSet;

        public RepositorioBase(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        #region Consultas
        public async Task<T?> ObterPorIdAsync(int id, CancellationToken cancellationToken = default)
        {
            return await _dbSet.FindAsync(new object?[] { id }, cancellationToken);
        }

        public async Task<IEnumerable<T>> ObterTodosAsync(CancellationToken cancellationToken = default)
        {
            return await _dbSet.AsNoTracking().ToListAsync(cancellationToken);
        }

        public async Task<IEnumerable<T>> BuscarAsync(Expression<Func<T, bool>> filtro, CancellationToken cancellationToken = default)
        {
            return await _dbSet.AsNoTracking().Where(filtro).ToListAsync(cancellationToken);
        }

        public async Task<T?> PrimeiroOuPadraoAsync(Expression<Func<T, bool>> filtro, CancellationToken cancellationToken = default)
        {
            return await _dbSet.AsNoTracking().FirstOrDefaultAsync(filtro, cancellationToken);
        }
        #endregion

        #region Escritas
        public async Task AdicionarAsync(T entity, CancellationToken cancellationToken = default)
        {
            await _dbSet.AddAsync(entity, cancellationToken);
        }

        public async Task AdicionarVariosAsync(IEnumerable<T> entities, CancellationToken cancellationToken = default)
        {
            await _dbSet.AddRangeAsync(entities, cancellationToken);
        }

        public void Atualizar(T entity)
        {
            _dbSet.Update(entity);
        }

        public void Remover(T entity)
        {
            _dbSet.Remove(entity);
        }

        public void RemoverVarios(IEnumerable<T> entities)
        {
            _dbSet.RemoveRange(entities);
        }
        #endregion

        #region Persistencia
        public async Task<int> SalvarAlteracoesAsync(CancellationToken cancellationToken = default)
        {
            return await _context.SaveChangesAsync(cancellationToken);
        }
        #endregion
    }
}
