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
    }
}
