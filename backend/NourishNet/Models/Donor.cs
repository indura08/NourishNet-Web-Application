using Microsoft.AspNetCore.Identity;
using NourishNet.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace NourishNet.Models
{
    public class Donor : UserBase
    {
        public string OrganizaTionName { get; set; }
        [EnumDataType(typeof(OrganizationType), ErrorMessage = "Invalid organizational type")]
        public string OrganizationType { get; set; }
        public string OperatingHours { get; set; }
        public string UserType { get; set; } = "Donor";

    }
}
