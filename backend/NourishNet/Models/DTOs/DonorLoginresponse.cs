namespace NourishNet.Models.DTOs
{
    public class DonorLoginresponse
    {
        public ServiceResponse.LoginResponse response { get; set; }
        public Donor donor { get; set; }
    }
}
