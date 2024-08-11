using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NourishNet.Data.Services;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;

namespace NourishNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationRecipientController : ControllerBase
    {
        private readonly INotificationRecipeintService _notificationRecipientService;

        public NotificationRecipientController(INotificationRecipeintService notificationRecipient) {
            _notificationRecipientService = notificationRecipient;
        }

        [HttpGet("hi")]
        public IActionResult SayHello()
        {
            return Ok("Hello this is Notification Recipient controller");       //this was a test code
        }

        public async Task<ActionResult<List<NotificationRecipient>>> GetAll() { 
            var notificationList = await _notificationRecipientService.GetAll();

            if (notificationList.Count > 0)
            {
                return Ok(notificationList);
            }
            else {
                return NotFound();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<NotificationRecipient>> GetById(int id) { 
            var currentNotification = await _notificationRecipientService.GetById(id);

            if (currentNotification != null) {
                return Ok(currentNotification);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPut("update/{id}")]
        public async Task<ActionResult<string>> UpdateById(int id, NotificationRecipient notificationRecipient) { 
            
            var status = await _notificationRecipientService.UpdateById(id, notificationRecipient);
            string statusText = status.ToString();
            if (statusText == "Success")
            {
                return Ok("Updated");
            }
            else {
                return NotFound("Error occured");
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> AddNewNotification(NotificationRecipient notificationRecipient) {
            await _notificationRecipientService.Add(notificationRecipient);
            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteById(int id) {
            var currentNotification = await _notificationRecipientService.GetById(id);

            if (currentNotification != null)
            {
                await _notificationRecipientService.DeleteById(id);
                return Ok("deleted Successfully");
            }
            else {
                return NotFound("Couldnt found a notification with user id : " + id);
            }
        }
    }
}
