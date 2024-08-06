using Microsoft.AspNetCore.Identity;
using NourishNet.Models.Enums;

namespace NourishNet.Models
{
    public class Recipient : IdentityUser
    {
        public string RecipientName { get; set; }
        public string ContactPerson { get; set; }
        public string Phone { get; set; }
        public District BaseDistrict { get; set; }
        public Province BaseProvince { get; set; }
        public string Address { get; set; }
        public RecipientType RecipientType { get; set; }

        public Role Role { get; set; }

    }
}
