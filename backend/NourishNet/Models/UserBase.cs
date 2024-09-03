using Microsoft.AspNetCore.Identity;
using NourishNet.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace NourishNet.Models
{
    public class UserBase : IdentityUser
    {
        public string ContactPerson { get; set; }
        public string Phone { get; set; }
        [EnumDataType(typeof(District), ErrorMessage = "Wrong district name")]
        public string BaseDistrict { get; set; }
        [EnumDataType(typeof(Province), ErrorMessage = "wrong province name")]
        public string BaseProvince { get; set; }
        public string Address { get; set; }

        [EnumDataType(typeof(Role), ErrorMessage = "Wrong role value")]
        public string Role { get; set; }
        
    }
}
