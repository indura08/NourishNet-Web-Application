using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;

namespace NourishNet.Data.Services
{
    public class DonationHistoryService : IDonationHistory
    {
        private readonly AppDBContext _dbContext;

        public DonationHistoryService(AppDBContext dbContext) { 
            _dbContext = dbContext;
        }
        public async Task AddNewDonoationHistory(DonationHistory donationHistory)
        {
            var recipient = await _dbContext.Recipients.FindAsync(donationHistory.RecipientId);
            var foodlisting = await _dbContext.FoodListings.FindAsync(donationHistory.FoodListingId);

            donationHistory.Recipient = recipient;
            donationHistory.FoodListing = foodlisting;
            
            _dbContext.DonationHistories.Add(donationHistory);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteDonationHistory(int id)
        {
            await _dbContext.DonationHistories.Where(donationHistory => donationHistory.DonationId == id).ExecuteDeleteAsync();
        }

        public async Task<List<DonationHistory>> GetAll()
        {
            return await _dbContext.DonationHistories.ToListAsync();
        }

        public async Task<DonationHistory> GetById(int id)
        {
            return await _dbContext.DonationHistories.FindAsync();
        }

        public async Task<string> UpdateDonationHistroyById(int id, DonationHistory donationHistory)
        {
            var currentDonationHisotry = await _dbContext.DonationHistories.FindAsync();
            if (currentDonationHisotry != null)
            {
                return "Update";
            }
            else {
                return "Error";
            }
        }
    }
}
