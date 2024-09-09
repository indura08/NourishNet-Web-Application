using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NourishNet.Data;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;
using NourishNet.Models.DTOs;

namespace NourishNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipientController : ControllerBase
    {
        private readonly IRecipientService _recipientService;
        private readonly IRecipientUserAccount _recipientUserAccountService;
        private readonly UserManager<Recipient> _userManager;
        public RecipientController(UserManager<Recipient> userManager, IRecipientService recipientService , IRecipientUserAccount recipientUserAccount)
        {
            _recipientService = recipientService;
            _recipientUserAccountService = recipientUserAccount;
            _userManager = userManager;
        }

        [HttpGet("hi")]
        [Authorize(Roles = "Recipient")]
        public IActionResult SayHello() {
            return Ok("hello this is recipient controller");
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
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

        [HttpPost("create")]
        public async Task<IActionResult> CreateNewRecipient([FromBody] RecipientDTO recipientdto)
        {
            var response = await _recipientUserAccountService.CreateAccount(recipientdto);
            return Ok(response);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Recipient,Admin")]
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

        [HttpPut("update/{id}")]
        [Authorize(Roles = "Recipient,Admin")]
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
        [Authorize(Roles = "Recipient,Admin")]
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

        [HttpPost("login")]
        public async Task<IActionResult> RecipientLogin(LoginDTO loginDto)
        {
            var response = await _recipientUserAccountService.Login(loginDto);
            var recipient = await _userManager.FindByEmailAsync(loginDto.Email);

            var loginReponse = new LoginResponseDto
            {
                response = response,
                recipient = recipient!
            };
            return Ok(loginReponse);
        }
    }
}
