using Microsoft.AspNetCore.Authorization;
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
        private readonly IFoodListing _foodListingService;
        public FoodListingController(IFoodListing foodListService) {

            _foodListingService = foodListService;
        }

        [HttpGet("hi")]
        [Authorize(Roles = "Donor, Admin")]
        public string SayHello()
        {
            return "hello world this is foodlisting";
        }

        [HttpGet("all")]
        [Authorize(Roles = "Donor, Recipient , Admin")]
        public async Task<ActionResult<List<FoodListing>>> GetAllFoodListings() {

            var foodListings = await _foodListingService.GetAll();
            if (foodListings.Count > 0)
            {
                return Ok(foodListings);
            }
            else {
                return NotFound("Not found");
            }
        }

        [HttpPost("create")]
        [Authorize(Roles = "Donor, Admin")]
        public async Task<ActionResult<string>> NewFoodListing(FoodListing newFoodListing) {

            await _foodListingService.Add(newFoodListing);
            return Ok("new food listing created successfully");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FoodListing>> getFoodListingById(int id) {
            var currentFoodList = await _foodListingService.GetById(id);

            if (currentFoodList != null)
            {
                return Ok(currentFoodList);
            }
            else {
                return NotFound();
            }
        }

        [HttpPut("update/{id}")]
        public async Task<ActionResult<string>> updateById(int id, FoodListing foodListing)     //ActionResult<string> indicates that the method will either return a string (usually indicating success) or any other action result like BadRequest, NotFound, etc.
        {

            var status = await _foodListingService.UpdateByID(id, foodListing);
            string statusText = status.ToString();

            if (statusText == "updated")
            {
                return Ok("Successfully Updated");
            }
            else {
                return NotFound("The FoodList item cannot be found please try again later");
            }
            
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteById(int id) { 
            var foodListing = await _foodListingService.GetById(id);
            if (foodListing != null)
            {
                _foodListingService.DeleteById(id);
                return Ok("deleted Successfully");
            }

            else 
            {
                return NotFound();
            
            }
        }
    }
}

//In the code you provided earlier, you didn't explicitly use the [FromBody] attribute in your controller methods. However, by default, ASP.NET Core assumes that complex types like your FoodListing model should be bound from the request body. So, the framework automatically interprets the input data as coming from the request body unless you specify otherwise.
