using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NourishNet.Data.Services;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;
using NourishNet.Models.DTOs;

namespace NourishNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodListingController : ControllerBase
    {
        private readonly IFoodListing _foodListingService;
        private readonly UserManager<Donor> _userManager;
        public FoodListingController(IFoodListing foodListService, UserManager<Donor> userManager) {

            _foodListingService = foodListService;
            _userManager = userManager;
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
                foreach (var listing in foodListings)
                {
                    if (!string.IsNullOrEmpty(listing.ImagePath)) 
                    {
                        listing.ImagePath = $"{Request.Scheme}://{Request.Host}/images/{Path.GetFileName(listing.ImagePath)}";
                          
                    }
                }

                return Ok(foodListings);
            }
            else {
                return NotFound("Not found");
            }
        }

        [HttpPost("create")]
        [Authorize(Roles = "Donor, Admin")]
        public async Task<ActionResult<string>> NewFoodListing(FoodListingVM newFoodListing) {

            var donor = await _userManager.FindByIdAsync(newFoodListing.DonorId);
            if (donor == null)
            {
                return BadRequest("Donor not found , please try agian creating afoodlist with valid donor account");
            }

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
        [Authorize(Roles = "Admin , Donor, Recipient")]
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
