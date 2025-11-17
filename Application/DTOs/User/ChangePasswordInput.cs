namespace Application.DTOs.User
{
    public class ChangePasswordInput
    {
        public string Password { get; set; } = string.Empty;
        public int UserId { get; set; }
    }
}
