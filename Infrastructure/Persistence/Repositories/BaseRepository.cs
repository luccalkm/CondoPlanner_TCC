using Application.Interfaces;
using Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infrastructure.Persistence.Repositories
{
    public class BaseRepository<T> : IRepository<T> where T : class
    {
        private readonly AppDbContext _context;
        private readonly DbSet<T> _dbSet;

        public BaseRepository(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        #region Consultas
        public async Task<T?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            return await _dbSet.FindAsync(new object?[] { id }, cancellationToken);
        }

        public async Task<T?> GetTrackedAsync(Expression<Func<T, bool>> filtro, CancellationToken cancellationToken = default)
        {
            return await _dbSet.FirstOrDefaultAsync(filtro, cancellationToken);
        }

        public async Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return await _dbSet.AsNoTracking().ToListAsync(cancellationToken);
        }

        public async Task<IEnumerable<T>> FetchAsync(Expression<Func<T, bool>> filtro, CancellationToken cancellationToken = default)
        {
            return await _dbSet.AsNoTracking().Where(filtro).ToListAsync(cancellationToken);
        }

        public async Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> filtro, CancellationToken cancellationToken = default)
        {
            return await _dbSet.AsNoTracking().FirstOrDefaultAsync(filtro, cancellationToken);
        }

        private IQueryable<T>? _query;
        public IQueryable<T> Include(params Expression<Func<T, object>>[] includes)
        {
            _query ??= _dbSet.AsQueryable();

            foreach (var include in includes)
            {
                _query = _query.Include(include);
            }

            return _query;
        }

        public IQueryable<T> Include(params string[] includes)
        {
            IQueryable<T> query = _dbSet.AsQueryable();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return query;
        }

        #endregion

        #region Escritas
        public async Task AddAsync(T entity, CancellationToken cancellationToken = default)
        {
            await _dbSet.AddAsync(entity, cancellationToken);
        }

        public async Task BulkAddAsync(IEnumerable<T> entities, CancellationToken cancellationToken = default)
        {
            await _dbSet.AddRangeAsync(entities, cancellationToken);
        }

        public void Update(T entity)
        {
            _dbSet.Update(entity);
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }

        public void BulkDelete(IEnumerable<T> entities)
        {
            _dbSet.RemoveRange(entities);
        }
        #endregion

        #region Persistencia
        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await _context.SaveChangesAsync(cancellationToken);
        }
        #endregion
    }
}
