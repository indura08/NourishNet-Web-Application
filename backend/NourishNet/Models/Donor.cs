using Microsoft.AspNetCore.Identity;
using NourishNet.Models.Enums;

namespace NourishNet.Models
{
    public class Donor : IdentityUser
    {
        public string OrganizaTionName { get; set; }
        public OrganizationType OrganizationType { get; set; }
        public string ContactPersoon { get; set; }
        public string Phone { get; set; }
        public District BaseDistrict { get; set; }
        public Province BaseProvince { get; set; }
        public  string Address { get; set; }
        public TimeOnly OperatingHours { get; set; }

    }
}
