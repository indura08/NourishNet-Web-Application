using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NourishNet.Data.Services;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;

namespace NourishNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodListingController : ControllerBase
    {
        IFoodListing _foodListingService;
        public FoodListingController(IFoodListing foodListService) {
            
            _foodListingService = foodListService;
        }

        [HttpGet("hi")]
        public string SayHello()
        {
            return "hello world this is foodlisting";
        }

        [HttpGet("all")]
        public async Task<ActionResult<List<FoodListing>>> GetAllFoodListings() {

            var foodListings = await _foodListingService.GetAll();
            if (foodListings != null)
            {
                return Ok(foodListings);
            }
            else {
                return NotFound("Not found");
            }
        }

        [HttpPost("create")]
        public async Task<ActionResult<string>> NewFoodListing(FoodListing newFoodListing) {

            await _foodListingService.Add(newFoodListing);
            return Ok("new food listing created successfully");
        }
    }
}
