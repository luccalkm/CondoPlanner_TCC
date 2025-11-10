using Domain.Common;

namespace Domain.Entities
{
    public class AreaComumFoto : EntidadeRastreadaComum
    {
        public byte[] ConteudoZip { get; set; } = Array.Empty<byte>();
        public string TipoConteudo { get; set; } = string.Empty;
        public string NomeArquivoOriginal { get; set; } = string.Empty;
        public long TamanhoOriginal { get; set; }
        public string HashSha256 { get; set; } = string.Empty;

        public int AreaComumId { get; set; }
        public AreaComum AreaComum { get; set; } = null!;
    }
}