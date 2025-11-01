using System.Linq.Expressions;

namespace Application.Interfaces
{
    public interface IRepositorio<T> where T : class
    {
        Task<T?> ObterPorIdAsync(int id, CancellationToken cancellationToken = default);
        Task<IEnumerable<T>> ObterTodosAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<T>> BuscarAsync(Expression<Func<T, bool>> filtro, CancellationToken cancellationToken = default);
        Task<T?> PrimeiroOuPadraoAsync(Expression<Func<T, bool>> filtro, CancellationToken cancellationToken = default);

        Task AdicionarAsync(T entity, CancellationToken cancellationToken = default);
        Task AdicionarVariosAsync(IEnumerable<T> entities, CancellationToken cancellationToken = default);
        void Atualizar(T entity);
        void Remover(T entity);
        void RemoverVarios(IEnumerable<T> entities);

        Task<int> SalvarAlteracoesAsync(CancellationToken cancellationToken = default);
    }
}
