namespace Application.DTOs.CommonArea
{
    public class CommonAreaPhotoDto
    {
        public int Id { get; set; }
        public string ContentType { get; set; } = string.Empty;
        public string OriginalFileName { get; set; } = string.Empty;
        public long OriginalSize { get; set; }
        public string HashSha256 { get; set; } = string.Empty;
        public string? Base64Data { get; set; }
    }
}