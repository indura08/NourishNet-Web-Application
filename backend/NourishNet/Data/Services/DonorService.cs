using Microsoft.EntityFrameworkCore;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;

namespace NourishNet.Data.Services
{
    public class DonorService : IDonorService
    {
        private readonly AppDBContext _dbContext;

        public DonorService(AppDBContext dbContext) { 
            _dbContext = dbContext;
        }
        public async Task AddNewDonor(Donor donor)
        {
            _dbContext.Donors.Add(donor);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Deletedonor(string id)
        {
            await _dbContext.Donors.Where(donor => donor.Id == id).ExecuteDeleteAsync();
        }

        public async Task<List<Donor>> GetAll()
        {
            var DonorList = await _dbContext.Donors.ToListAsync();
            return DonorList;
        }

        public async Task<Donor> GetDonorById(string id)
        {
            return await _dbContext.Donors.FindAsync(id);
        }

        public async Task<string> UpdateDonorById(string id, Donor donor)
        {
            var currentDonor = await _dbContext.Donors.FindAsync(donor.Id);
            if (currentDonor != null)
            {
                _dbContext.Entry(donor).CurrentValues.SetValues(currentDonor);
                _dbContext.SaveChanges();
                return "Updated";
            }
            else {
                return "Error Occured";
            }
        }

         
        
    }
}
