namespace NourishNet.Models.DTOs
{
    public class LoginResponseDto
    {
        public ServiceResponse.LoginResponse response { get; set; }
        public Recipient recipient { get; set; }
    }
}
