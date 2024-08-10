using Microsoft.EntityFrameworkCore;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;

namespace NourishNet.Data.Services
{
    public class FoodListingsService : IFoodListing
    {
        private readonly AppDBContext _dbContext;

        public FoodListingsService(AppDBContext dbContext) { 
            
            _dbContext = dbContext;
        }

        public async Task<List<FoodListing>> GetAll()
        {
            return await _dbContext.FoodListings.ToListAsync();
        }

        public async Task Add(FoodListing foodListing)
        {
            _dbContext.FoodListings.AddAsync(foodListing);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<FoodListing> GetById(int id)
        {
            var foodListing = await _dbContext.FoodListings.FindAsync(id);
            
            if (foodListing == null) {
                
                return null;
            }
            else {
                return foodListing;
            }
        }

        public async Task<string> UpdateByID(int id, FoodListing foodListing)
        {
            var currentFoodList = await _dbContext.FoodListings.FindAsync(id);

            if (currentFoodList != null)
            {
                _dbContext.Entry(currentFoodList).CurrentValues.SetValues(foodListing);
                await _dbContext.SaveChangesAsync();
                
                return "updated";
            }
            else {
                return "error occured";

            }
        }

        public async Task<string> DeleteById(int id)
        {
            await _dbContext.FoodListings.Where(foodList => foodList.Id == id).ExecuteDeleteAsync();
            return "Your food List has been deleted successfully";
        }

        public async Task SaveChanges()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
