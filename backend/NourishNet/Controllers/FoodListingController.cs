using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NourishNet.Data.Services;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

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

        [HttpGet("{id}")]
        public async Task<ActionResult<FoodListing>> getFoodListingById(int id) {
            var currentFoodList = _foodListingService.GetById(id);

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

            var status = _foodListingService.UpdateByID(id, foodListing);
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
        public IActionResult DeleteById(int id) { 
            var foodListing = _foodListingService.GetById(id);
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
