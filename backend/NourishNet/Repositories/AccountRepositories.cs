using Microsoft.AspNetCore.Identity;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;
using NourishNet.Models.DTOs;
using NourishNet.Models.Enums;

namespace NourishNet.Repositories
{
    public class AccountRepositories : IDonorUserAccount
    {
        private readonly UserManager<Donor> _userManager;
        //private readonly RoleManager<Role> _roleManager;

        public AccountRepositories() { }
        public Task<ServiceResponse.GeneralResponse> CreateAccount(DonorDTO donorDTO)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse.LoginResponse> Login(LoginDTO loginDTO)
        {
            throw new NotImplementedException();
        }
    }
}
