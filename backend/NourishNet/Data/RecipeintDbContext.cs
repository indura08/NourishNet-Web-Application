using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NourishNet.Models;

namespace NourishNet.Data
{
    public class RecipeintDbContext : IdentityDbContext<Recipient>
    {
        public RecipeintDbContext(DbContextOptions<RecipeintDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Recipient>(entity =>
            {
                entity.ToTable("aspnetusers");
                entity.Property(r => r.RecipientName).HasColumnName("recipientName");
                entity.Property(r => r.RecipientType).HasColumnName("RecipientType");
            });
        }
    }
}
