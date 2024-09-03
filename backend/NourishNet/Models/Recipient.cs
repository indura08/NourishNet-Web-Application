using Microsoft.AspNetCore.Identity;
using NourishNet.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace NourishNet.Models
{
    public class Recipient : UserBase
    {
        public string RecipientName { get; set; }

        [EnumDataType(typeof(RecipientType), ErrorMessage = "Wrong recipient type name")]
        public string RecipientType { get; set; }
        public string UserType { get; set; } = "Recipient";

    }
}
