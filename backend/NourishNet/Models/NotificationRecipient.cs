using System.ComponentModel.DataAnnotations.Schema;

namespace NourishNet.Models
{
    public class NotificationRecipient
    {
        public int Id { get; set; }
        public string RecipientId { get; set; }
        [ForeignKey("RecipientId")]
        public Recipient Recipient { get; set; }
        public string Description { get; set; }
        public DateOnly CreatedDate { get; set; }
        public TimeOnly CreatedTime { get; set; }

    }
}
