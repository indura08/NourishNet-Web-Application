using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NourishNet.Models
{
    public class DonationHistory
    {
        [Key]
        public int DonationId { get; set; }
        public string RecipientId { get; set; }

        [ForeignKey("RecipientId")]
        public Recipient Recipient { get; set; }

        public int FoodListingId { get; set; }

        [ForeignKey("FoodListingId")]
        public FoodListing FoodListing { get; set; }

        public string DataReceived { get; set; }
        

    }
}
