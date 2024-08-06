using Microsoft.AspNetCore.Identity;
using NourishNet.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace NourishNet.Models
{
    public class Admin : IdentityUser 
    {
        public string UserName { get; set; }
        public Role  Role { get; set; }


    }
}
