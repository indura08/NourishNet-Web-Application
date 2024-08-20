using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models.DTOs;

namespace NourishNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorLoginController : ControllerBase
    {
        private readonly IDonorUserAccount _idonorUserAccountService;

        public DonorLoginController(IDonorUserAccount idonorUserAccountService)
        {
            _idonorUserAccountService = idonorUserAccountService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDto) 
        {
            var response = _idonorUserAccountService.Login(loginDto);
            return Ok(response);
        }
    }
}
