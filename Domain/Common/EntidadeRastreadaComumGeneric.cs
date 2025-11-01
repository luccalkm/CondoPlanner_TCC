namespace Domain.Common
{
    public class EntidadeRastreadaComum<T> 
    {
        public int Id { get; set; }
        public DateTime DataCriacao { get; set; }
        public int UsuarioCriadorId { get; set; }

    }
}
