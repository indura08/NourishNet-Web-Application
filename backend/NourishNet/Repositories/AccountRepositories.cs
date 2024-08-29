using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;
using NourishNet.Models.DTOs;
using NourishNet.Models.Enums;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NourishNet.Repositories
{
    public class AccountRepositories : IDonorUserAccount
    {
        private readonly UserManager<Donor> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _iConfig;
        private readonly IDonorService _donorService;

        public AccountRepositories(IDonorService iDonorService ,UserManager<Donor> userManager, RoleManager<IdentityRole> roleManager, IConfiguration iConfig)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _iConfig = iConfig;
            _donorService = iDonorService;
        }

        public async Task<ServiceResponse.GeneralResponse> CreateAccount(DonorDTO donorDTO)
        {
            if (donorDTO is null) return new ServiceResponse.GeneralResponse(false, "Modal is empty");

            var newDonor = new Donor()
            {
                OrganizaTionName = donorDTO.OrganizaTionName,
                OrganizationType = donorDTO.OrganizationType,
                ContactPersoon = donorDTO.ContactPersoon,
                Phone = donorDTO.Phone,
                BaseDistrict = donorDTO.BaseDistrict,
                BaseProvince = donorDTO.BaseProvince,
                Address = donorDTO.Address,
                OperatingHours = donorDTO.OperatingHours,
                Role = donorDTO.Role,

                Email = donorDTO.Email,
                PasswordHash = donorDTO.Password,
                UserName = donorDTO.UserName,
            };

            var existingDonor = await _userManager.FindByEmailAsync(donorDTO.Email);
            if (existingDonor is not null) return new ServiceResponse.GeneralResponse(false, "User registered already , try with diffrent email");

            var createdDonor = await _userManager.CreateAsync(newDonor! , donorDTO.Password);
            await _donorService.AddNewDonor(newDonor);
            //if (!createdDonor.Succeeded) return new ServiceResponse.GeneralResponse(false, "Error occured ,try again later");

            if (!createdDonor.Succeeded)
            {
                var errors = string.Join(", ", createdDonor.Errors.Select(e => e.Description));
                return new ServiceResponse.GeneralResponse(false, $"Error occurred: {errors}");
            }

            var checkDonorRole = await _roleManager.FindByNameAsync("Donor");
            
            if (newDonor.Role == Role.Donor.ToString() && checkDonorRole is null)
            {
                await _roleManager.CreateAsync(new IdentityRole() { Name = "Donor" });
                await _userManager.AddToRoleAsync(newDonor, "Donor");
                return new ServiceResponse.GeneralResponse(true, "Account created successfully");
            }
            else if (newDonor.Role == Role.Donor.ToString() && checkDonorRole is not null)
            {
                await _userManager.AddToRoleAsync(newDonor, "Donor");
                return new ServiceResponse.GeneralResponse(true, "Account created successfully");
            }
            else {
                return new ServiceResponse.GeneralResponse(false, "Error Occured , Please check again");
            }
        }

        public async Task<ServiceResponse.LoginResponse> Login(LoginDTO loginDTO)
        {
            if (loginDTO == null) return new ServiceResponse.LoginResponse(false, null!, "Login credentials are empty");

            var currentUser = await _userManager.FindByEmailAsync(loginDTO.Email);
            
            if (currentUser is null) return new ServiceResponse.LoginResponse(false, null!, "User not found");

            bool checkUserPassword = await _userManager.CheckPasswordAsync(currentUser, loginDTO.Password);

            if (!checkUserPassword) return new ServiceResponse.LoginResponse(false, null!, "Incorrect Email/Password");

            var getUserRole = await _userManager.GetRolesAsync(currentUser);
            var userSession = new UserSession(currentUser.Id, currentUser.OrganizaTionName, currentUser.Email, getUserRole.First());

            string Token = GenerateToken(userSession);
            return new ServiceResponse.LoginResponse(true, Token!, "Login succeeded");
        }

        private string GenerateToken(UserSession userSession) 
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_iConfig["Jwt:Key"]!));

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var userClaims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userSession.Id),
                new Claim(ClaimTypes.Name, userSession.Name),
                new Claim(ClaimTypes.Email, userSession.Email),
                new Claim(ClaimTypes.Role, userSession.Role)
            };

            var Token = new JwtSecurityToken(
                issuer: _iConfig["Jwt:Issuer"],
                audience: _iConfig["Jwt: Audience"],
                claims: userClaims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(Token);
        }
    }
}
