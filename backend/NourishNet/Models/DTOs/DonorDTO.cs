using NourishNet.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace NourishNet.Models.DTOs
{
    public class DonorDTO
    {
        public string OrganizaTionName { get; set; }
        [EnumDataType(typeof(OrganizationType), ErrorMessage = "Wrong organizational type name")]
        public string OrganizationType { get; set; }
        public string ContactPersoon { get; set; }
        public string Phone { get; set; }
        [EnumDataType(typeof(District), ErrorMessage = "Wrong district name")]
        public string BaseDistrict { get; set; }
        [EnumDataType(typeof(Province), ErrorMessage = "Wrong province name")]
        public string BaseProvince { get; set; }
        public string Address { get; set; }
        public string OperatingHours { get; set; }
        [EnumDataType(typeof(Role), ErrorMessage = "Wrong role value")]
        public string Role { get; set; }

        [Required]
        [EmailAddress]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; } = string.Empty; //mehm empty string ekk daala thiyna ek samnyen hodi 

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Password)]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; } = string.Empty;

        [Required]
        public string UserName { get; set; } = string.Empty;

    }
}
