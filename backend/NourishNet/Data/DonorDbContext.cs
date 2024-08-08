using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NourishNet.Models;

namespace NourishNet.Data
{
    public class DonorDbContext : IdentityDbContext<Donor>
    {
        public DonorDbContext(DbContextOptions<DonorDbContext> options) : base(options) { }
    }
}
