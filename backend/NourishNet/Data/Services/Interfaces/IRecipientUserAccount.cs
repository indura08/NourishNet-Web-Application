using NourishNet.Models.DTOs;

namespace NourishNet.Data.Services.Interfaces
{
    public interface IRecipientUserAccount
    {
        Task<ServiceResponse.GeneralResponse> CreateAccount(RecipientDTO recipientDTO);
        Task<ServiceResponse.LoginResponse> Login(LoginDTO loginDTO);
    }
}
