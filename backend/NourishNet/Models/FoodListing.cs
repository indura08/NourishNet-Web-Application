using Microsoft.AspNetCore.Identity;
using NourishNet.Models.Enums;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using System.ComponentModel.DataAnnotations;

namespace NourishNet.Models
{
    public class FoodListing
    {
        public int Id { get; set; }

        public string DonorId { get; set; }

        [ForeignKey("DonorId")]
        public Donor Donor { get; set; }
        [EnumDataType(typeof(FoodType), ErrorMessage = "Wrong foodtype name")]
        public string FoodType { get; set; }
        public string Description { get; set; }
        public double Quantity { get; set; }
        public string PostedDate { get; set; }
        public String ExpiryDate { get; set; }
        public string ImagePath { get; set; }
        [EnumDataType(typeof(FoodListingStatus), ErrorMessage = "check status again , the current status is wrong")]
        public string CurrentStatus { get; set; }

    }


//public static class FoodListingEndpoints
//{
//	public static void MapFoodListingEndpoints (this IEndpointRouteBuilder routes)
//    {
//        var group = routes.MapGroup("/api/FoodListing").WithTags(nameof(FoodListing));

//        group.MapGet("/", () =>
//        {
//            return new [] { new FoodListing() };
//        })
//        .WithName("GetAllFoodListings")
//        .WithOpenApi();

//        group.MapGet("/{id}", (int id) =>
//        {
//            //return new FoodListing { ID = id };
//        })
//        .WithName("GetFoodListingById")
//        .WithOpenApi();

//        group.MapPut("/{id}", (int id, FoodListing input) =>
//        {
//            return TypedResults.NoContent();
//        })
//        .WithName("UpdateFoodListing")
//        .WithOpenApi();

//        group.MapPost("/", (FoodListing model) =>
//        {
//            //return TypedResults.Created($"/api/FoodListings/{model.ID}", model);
//        })
//        .WithName("CreateFoodListing")
//        .WithOpenApi();

//        group.MapDelete("/{id}", (int id) =>
//        {
//            //return TypedResults.Ok(new FoodListing { ID = id });
//        })
//        .WithName("DeleteFoodListing")
//        .WithOpenApi();
//    }
//}
}
