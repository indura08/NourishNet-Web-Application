using NourishNet.Models.DTOs;

namespace NourishNet.Data.Services.Interfaces
{
    public interface IDonorUserAccount
    {
        Task<ServiceResponse.GeneralResponse> CreateAccount(DonorDTO donorDTO);
        Task<ServiceResponse.LoginResponse> Login(LoginDTO loginDTO);

    }
}
