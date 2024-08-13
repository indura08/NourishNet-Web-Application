using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;

namespace NourishNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipientController : ControllerBase
    {
        private readonly IRecipientService _recipientService;
        public RecipientController(IRecipientService recipientService)
        {
            _recipientService = recipientService;
        }

        [HttpGet("hi")]
        public IActionResult SayHello() {
            return Ok("hello this is recipient controller");
        }

        [HttpGet("all")]
        public async Task<ActionResult<List<Recipient>>> GetAllRecipients() {
            var recipientList = await _recipientService.GetAll();

            if (recipientList.Count > 0)
            {
                return Ok(recipientList);
            }
            else {
                return NotFound("Not found any recipients");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Recipient>> GetById(string id) { 
            var currentRecipient = await _recipientService.GetRecipientById(id);

            if (currentRecipient != null)
            {
                return Ok(currentRecipient);
            }
            else {
                return NotFound("Not found any recipient with id : " + id);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> UpdateById(string id, Recipient recipientUpdate) {
            
            var status = await _recipientService.UpdateRecipientById(id, recipientUpdate);
            string statusText = status.ToString();

            if (statusText == "Updated")
            {
                return Ok(statusText);
            }
            else {
                return NotFound("Couldnt found any recipient with id : " + id);
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteById(string id) {
            var currentRecipient = _recipientService.GetRecipientById(id);
            if (currentRecipient != null)
            {
                await _recipientService.DeleteRecipientById(id);
                return Ok("deleted succesfully");
            }
            else {
                return NotFound();   
            }
        }
    }
}
