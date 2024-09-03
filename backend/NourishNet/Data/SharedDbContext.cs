using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NourishNet.Models;

namespace NourishNet.Data
{
    public class SharedDbContext : IdentityDbContext
    {
        public SharedDbContext(DbContextOptions<SharedDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserBase>()
                .ToTable("AspNetUsers") 
                .HasDiscriminator<string>("UserType") 
                .HasValue<Recipient>("Recipient")
                .HasValue<Donor>("Donor");

            builder.Entity<Recipient>(entity =>
            {
                entity.ToTable("AspNetUsers");
                entity.Property(r => r.RecipientName).HasColumnName("recipientName");
                entity.Property(r => r.RecipientType).HasColumnName("RecipientType");
            });

            builder.Entity<Donor>(entity =>
            {
                entity.ToTable("AspNetUsers");
                entity.Property(d => d.OrganizaTionName).HasColumnName("OrganizationName");
                entity.Property(d => d.OrganizationType).HasColumnName("OrganizationType");
                entity.Property(d => d.OperatingHours).HasColumnName("OperatingHours");
            });
        }
    }
}
