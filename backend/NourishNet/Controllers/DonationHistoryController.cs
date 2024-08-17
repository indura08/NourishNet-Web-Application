using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NourishNet.Data.Services;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;

namespace NourishNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationHistoryController : ControllerBase
    {
        private readonly IDonationHistory _donationHistoryService;

        public DonationHistoryController(IDonationHistory donationHistory) {
            _donationHistoryService = donationHistory;
        }

        [HttpGet("hi")]
        public IActionResult SayHello() {
            return Ok("hello from donation history controller");
        }       //this was for testing purposes

        [HttpGet("all")]
        public async Task<ActionResult<List<DonationHistory>>> GetAll() { 
            var AllList = await _donationHistoryService.GetAll();
            if (AllList.Count > 0)
            {
                return Ok(AllList);
            }
            else {
                return NotFound("not found any donation service history object");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DonationHistory>> GetById(int id) {
            var currentdonationHistory = await _donationHistoryService.GetById(id);
            if (currentdonationHistory != null)
            {
                return Ok(currentdonationHistory);
            }
            else {
                return NotFound("Not found any donation history with id : " + id);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateNewDonationHistory(DonationHistory donationHistory) { 
            await _donationHistoryService.AddNewDonoationHistory(donationHistory);
            return Ok(donationHistory);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateDonationHistory(int id, DonationHistory donationHistory) { 
            var status = await _donationHistoryService.UpdateDonationHistroyById(id, donationHistory);
            string statusText = status.ToString();

            if (statusText == "Update")
            {
                return Ok("Successfully updated");
            }
            else {
                return NotFound("not foud any donation history with id : " + id);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(int id) {
            var currentdonationHistory = await _donationHistoryService.GetById(id);
            if (currentdonationHistory != null)
            {
                await _donationHistoryService.DeleteDonationHistory(id);
                return Ok("Deleted Successfully");
            }
            else {
                return NotFound("Not found any donationHistory with id : " + id);
            }
        }
    }
}
