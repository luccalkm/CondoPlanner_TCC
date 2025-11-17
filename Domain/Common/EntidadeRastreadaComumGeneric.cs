namespace Domain.Common
{
    public class EntidadeRastreadaComum<T> 
    {
        public T Id { get; set; } = default!;
        public DateTime DataCriacao { get; set; }
    }
}
