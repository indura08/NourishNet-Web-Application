using Microsoft.AspNetCore.Identity;
using NourishNet.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace NourishNet.Models
{
    public class Donor : IdentityUser
    {
        public string OrganizaTionName { get; set; }
        [EnumDataType(typeof(OrganizationType), ErrorMessage = "Invalid organizational type")]
        public string OrganizationType { get; set; }
        public string ContactPersoon { get; set; }
        public string Phone { get; set; }
        [EnumDataType(typeof(District), ErrorMessage = "Wrong district name")]
        public string BaseDistrict { get; set; }
        [EnumDataType(typeof(Province), ErrorMessage = "Wrong province name")]
        public string BaseProvince { get; set; }
        public  string Address { get; set; }
        public string OperatingHours { get; set; }
        [EnumDataType(typeof(Role), ErrorMessage = "Invalid Role check the role Value again")]
        public string Role { get; set; }

    }
}
