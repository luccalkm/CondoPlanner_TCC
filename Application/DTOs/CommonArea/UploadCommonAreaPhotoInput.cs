namespace Application.DTOs.CommonArea
{
    public class UploadCommonAreaPhotoInput
    {
        public int AreaId { get; set; }
        public string ContentType { get; set; }
        public string FileName { get; set; }
        public string Base64Original { get; set; }
    }
}