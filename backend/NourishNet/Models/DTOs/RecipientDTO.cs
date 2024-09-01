using NourishNet.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace NourishNet.Models.DTOs
{
    public class RecipientDTO
    {
        public string RecipientName { get; set; }
        public string ContactPerson { get; set; }
        public string Phone { get; set; }
        [EnumDataType(typeof(District), ErrorMessage = "Enter a valid ditrict value")]
        public string BaseDistrict { get; set; }
        [EnumDataType(typeof(Province), ErrorMessage = "Enter a valid province value")]
        public string BaseProvince { get; set; }
        public string Address { get; set; }
        [EnumDataType(typeof(RecipientType), ErrorMessage = "Enter a valid recipient Type value")]
        public string RecipientType { get; set; }
        [EnumDataType(typeof(District), ErrorMessage = "Enter a valid Role value")]
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
