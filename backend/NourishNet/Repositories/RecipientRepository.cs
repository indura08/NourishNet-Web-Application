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
    public class RecipientRepository : IRecipientUserAccount
    {
        private readonly UserManager<Recipient> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _iConfig;
        private readonly IRecipientService _recipientService;

        public RecipientRepository(UserManager<Recipient> userManager, RoleManager<IdentityRole> roleManager, IConfiguration iConfig, IRecipientService recipientService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _iConfig = iConfig;
            _recipientService = recipientService;
        }

        public async Task<ServiceResponse.GeneralResponse> CreateAccount(RecipientDTO recipientDto)
        {
            if (recipientDto is null) return new ServiceResponse.GeneralResponse(false, "Please provide your credentials");

            var newRecipient = new Recipient()
            {
                RecipientName = recipientDto.RecipientName,
                ContactPerson = recipientDto.ContactPerson,
                Phone = recipientDto.Phone,
                BaseDistrict = recipientDto.BaseDistrict,
                BaseProvince = recipientDto.BaseProvince,
                Address = recipientDto.Address,
                RecipientType = recipientDto.RecipientType,
                Role = recipientDto.Role,

                Email = recipientDto.Email,
                PasswordHash = recipientDto.Password,
                UserName = recipientDto.UserName
            };

            var exsistingrecipient = await _userManager.FindByEmailAsync(newRecipient.Email);
            if (exsistingrecipient is not null) return new ServiceResponse.GeneralResponse(false, "User already registered");

            var createdRecipient = await _userManager.CreateAsync(newRecipient!, recipientDto.Password);
            await _recipientService.AddNewRecipient(newRecipient);

            if (!createdRecipient.Succeeded) {
                var errors = string.Join(", ", createdRecipient.Errors.Select(e => e.Description));
                return new ServiceResponse.GeneralResponse(false, $"Error occured: {errors}");
            }

            var checkRecipientrole = await _roleManager.FindByNameAsync("Recipient");
            if (newRecipient.Role == Role.Recipient.ToString() && checkRecipientrole is null)
            {
                await _roleManager.CreateAsync(new IdentityRole() { Name = "Recipient" });
                await _userManager.AddToRoleAsync(newRecipient, "Recipient");
                return new ServiceResponse.GeneralResponse(true, "Account created successfully");
            }
            else if (newRecipient.Role == Role.Recipient.ToString() && checkRecipientrole is not null)
            {
                await _userManager.AddToRoleAsync(newRecipient, "Recipient");
                return new ServiceResponse.GeneralResponse(true, "Account created successfully");
            }
            else {
                return new ServiceResponse.GeneralResponse(false, "error Occured Please Try again later");
            }
        }

        public async Task<ServiceResponse.LoginResponse> Login(LoginDTO loginDTO)
        {
            if (loginDTO == null) return new ServiceResponse.LoginResponse(false, null!, "Login credentials are empty");

            var currentUser = await _userManager.FindByEmailAsync(loginDTO.Email);

            if (currentUser is null) return new ServiceResponse.LoginResponse(false, null!, "User not found");

            bool checkedUserPassword = await _userManager.CheckPasswordAsync(currentUser, loginDTO.Password);

            if (!checkedUserPassword) return new ServiceResponse.LoginResponse(false, null!, "Incorrect Email/Password");

            var getUserRole = await _userManager.GetRolesAsync(currentUser);
            if (!getUserRole.Any())
            {
                return new ServiceResponse.LoginResponse(false, null!, "User does not have any roles assigned");
            }

            var userRole = getUserRole.First();
            var userSession = new UserSession(currentUser.Id, currentUser.RecipientName, currentUser.Email, userRole);

            string Token = GenerateToken(userSession);
            return new ServiceResponse.LoginResponse(true, Token!, "Login Succeded");
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
                audience: _iConfig["Jwt:Audience"],
                claims: userClaims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(Token);
        }

    }
}
