using NourishNet.Models.Enums;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NourishNet.Models.DTOs
{
    public class FoodListingVM
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
        public IFormFile Image { get; set; }
        [EnumDataType(typeof(FoodListingStatus), ErrorMessage = "check status again , the current status is wrong")]
        public string CurrentStatus { get; set; }
    }
}
