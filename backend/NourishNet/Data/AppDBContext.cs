using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NourishNet.Models;

namespace NourishNet.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options): base(options) { }
        
        public DbSet<DonationHistory> DonationHistories { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Donor> Donors { get; set; }
        public DbSet<FoodListing> FoodListings { get; set; } 
        public DbSet<NotificationDonor> DonorNotifications { get; set; }
        public DbSet<NotificationRecipient> RecipientNotifications { get; set; }
        public DbSet<Recipient> Recipients { get; set; }
    }

    public class DonorDbContext : IdentityDbContext<Donor>
    {
        public DonorDbContext(DbContextOptions<DonorDbContext> options) : base(options) { }
    }

    public class RecipientDbContext : IdentityDbContext<Recipient> 
    {
        public RecipientDbContext(DbContextOptions<RecipientDbContext> options) : base(options) { }

    }


}
