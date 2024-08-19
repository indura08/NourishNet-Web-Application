namespace NourishNet.Models.DTOs
{
    public class ServiceResponse
    {
        public record class GeneralResponse(bool Flag, string Message);
        public record class LoginResponse(bool flag, string Token, string Message);
    }
}
