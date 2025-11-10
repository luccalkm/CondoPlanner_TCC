namespace Application.DTOs.CommonArea
{   
    public class AddPhotoRequest
    {
        public string Path { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}