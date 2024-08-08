using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NourishNet.Models;

namespace NourishNet.Data
{
    public class RecipeintDbContext : IdentityDbContext<Recipient>
    {
        public RecipeintDbContext(DbContextOptions<RecipeintDbContext> options) : base(options) { }
    }
}
