using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NourishNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationDonorController : ControllerBase
    {
        [HttpGet("hi")]
        public string SayHello() {
            return "hi from notification donor class";
        }   //this is for testing pusrposes
    }
}
