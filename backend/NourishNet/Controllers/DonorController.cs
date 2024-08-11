using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;

namespace NourishNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorController : ControllerBase
    {
        private readonly IDonorService _donorService;

        public DonorController(IDonorService donorService) {
            _donorService = donorService;
        }

        [HttpGet("hi")]
        public IActionResult sayHello() {
            return Ok("hello this is donor class controller");
        }   //this is for testing purposes

        [HttpGet("all")]
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
        public async Task<ActionResult<Donor>> GetDonorById(int id) { 
            var currentDonor = await _donorService.GetDonorById(id);

            if (currentDonor != null) { 
                return Ok(currentDonor);
            }
            else {
                return NotFound("Not found any donor matching with id : " + id);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateNewDonor([FromBody] Donor donor) { 

            await _donorService.AddNewDonor(donor);
            return Ok(donor);
            
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdaetDonorById(int id, Donor donor) { 
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


    }
}
