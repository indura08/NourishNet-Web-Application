using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NourishNet.Data;
using NourishNet.Data.Services;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;

namespace NourishNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationDonorController : ControllerBase
    {
        private readonly INOtificationDonorService _notificationDonorService;
        public NotificationDonorController(INOtificationDonorService notificationDonorService) {

            _notificationDonorService = notificationDonorService;
        }

        [HttpGet("hi")]
        public string SayHello() {
            return "hi from notification donor class";
        }   //this is for testing pusrposes

        [HttpGet("all")]
        public async Task<ActionResult<List<NotificationDonor>>> GetAll() {
            var notificationList = await _notificationDonorService.GetAll();

            if (notificationList.Count > 0)
            {
                return Ok(notificationList);
            }
            else {
                return NotFound();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<NotificationDonor>> GetById(int id) {

            var currentNotification = await _notificationDonorService.GetById(id);

            if (currentNotification != null)
            {
                return Ok(currentNotification);
            }

            else {
                return NotFound();
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> AddNewNotification(NotificationDonor notificationDonor) {
            await _notificationDonorService.Add(notificationDonor);
            return Ok();
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateById(int id, NotificationDonor notificationDonor) {
            
            var status = _notificationDonorService.UpdateById(id, notificationDonor);

            string statusText = status.ToString();
            if (statusText == "Updated")
            {

                return Ok("Upated sucesfully!");
            }
            else {
                return NotFound("Error occured");
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteById(int id) { 
            var currentNotification = await _notificationDonorService.GetById(id);
            if (currentNotification != null)
            {
                await _notificationDonorService.DeleteById(id);
                return Ok("Deleted Succesfully");
            }
            else {
                return NotFound("Not found current notification for id you provided");
            }
        }
    }
}
