using NourishNet.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace NourishNet.Models.DTOs
{
    public class RecipientDTO
    {
        public string RecipientName { get; set; }
        public string ContactPerson { get; set; }
        public string Phone { get; set; }
        public District BaseDistrict { get; set; }
        public Province BaseProvince { get; set; }
        public string Address { get; set; }
        public RecipientType RecipientType { get; set; }

        public Role Role { get; set; }

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
    }
}
