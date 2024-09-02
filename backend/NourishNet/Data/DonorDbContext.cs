using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NourishNet.Models;

namespace NourishNet.Data
{
    public class DonorDbContext : IdentityDbContext<Donor>
    {
        public DonorDbContext(DbContextOptions<DonorDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Donor>(entity =>
            {
                entity.ToTable("aspnetusers");
                entity.Property(d => d.OrganizaTionName).HasColumnName("OrganizationName");
                entity.Property(d => d.OrganizationType).HasColumnName("OrganizationType");
                entity.Property(d => d.OperatingHours).HasColumnName("OperatingHours");
            });
        }
    }
}
