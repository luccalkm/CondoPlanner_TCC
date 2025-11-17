namespace Application.DTOs.CommonArea
{
    public class UploadCommonAreaPhotoInput
    {
        public int AreaId { get; set; }
        public string ContentType { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public string Base64Original { get; set; } = string.Empty;
    }
}