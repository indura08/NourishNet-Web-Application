using Microsoft.AspNetCore.Identity;
using NourishNet.Models.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace NourishNet.Models
{
    public class FoodListing
    {
        public int Id { get; set; }

        public string DonorId { get; set; }

        [ForeignKey("DonorId")]
        public Donor Donor { get; set; }
        public FoodType FoodType { get; set; }
        public string Description { get; set; }
        public double Quantity { get; set; }
        public DateOnly PostedDate { get; set; }
        public DateOnly ExpiryDate { get; set; }
        public string ImagePath { get; set; }
        public FoodListingStatus CurrentStatus { get; set; }

    }
}
