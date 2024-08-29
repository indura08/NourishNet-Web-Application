using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;
using NourishNet.Models.DTOs;

namespace NourishNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorController : ControllerBase
    {
        private readonly IDonorService _donorService;
        private readonly IDonorUserAccount _donorUserAccountService;

        public DonorController(IDonorService donorService, IDonorUserAccount donorUserAccountService)
        {
            _donorService = donorService;
            _donorUserAccountService = donorUserAccountService;
        }

        [HttpGet("hi")]
        [Authorize(Roles = "Donor")]
        public IActionResult sayHello() {
            return Ok("hello this is donor class controller");
        }   //this is for testing purposes

        [HttpGet("all")]
        [Authorize(Roles = "Donor")]
        public async Task<ActionResult<List<Donor>>> GetAllDonors() {

            var donors = await _donorService.GetAll();
            if (donors.Count > 0)
            {
                return Ok(donors);
            }
            else {
                return NotFound("Not found any donors");
            }
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Donor")]
        public async Task<ActionResult<Donor>> GetDonorById(string id) { 
            var currentDonor = await _donorService.GetDonorById(id);

            if (currentDonor != null) { 
                return Ok(currentDonor + currentDonor.PasswordHash);
            }
            else {
                return NotFound("Not found any donor matching with id : " + id);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateNewDonor([FromBody] DonorDTO donorDTO) {

            var response = await _donorUserAccountService.CreateAccount(donorDTO);
            return Ok(response);
            
        }

        [HttpPut("update/{id}")]
        [Authorize(Roles = "Donor")]
        public async Task<IActionResult> UpdaetDonorById(string id, Donor donor) { 
            var Status = await _donorService.UpdateDonorById(id, donor);
            string statusText = Status.ToString();

            if (statusText == "Updated")
            {
                return Ok("Update successfull");
            }
            else {
                return NotFound("Error occured please check again");
            }
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Donor")]
        public async Task<IActionResult> DeleteById(string id) {
            var currentDonor = await _donorService.GetDonorById(id);
            if (currentDonor != null)
            {
                await _donorService.Deletedonor(id);
                return Ok("Donor Account Deleted Successfully");
            }
            else {
                return Conflict("Donor account could'nt be deleted please check again or try again later");
            
                //return StatusCode(500, "Error occured") = mehm dannath puluwan
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> DonorLogin(LoginDTO loginDto)
        {
            var response = await _donorUserAccountService.Login(loginDto);
            return Ok(response);
        
        }


    }
}
