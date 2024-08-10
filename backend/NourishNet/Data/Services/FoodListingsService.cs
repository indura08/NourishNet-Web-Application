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
                _dbContext.Entry(currentFoodList).CurrentValues.SetValues(foodListing);     //another widiyak = _dbContext.Entry(product).State = EntityState.Modified; : mekn attama wenne = This marks the entire entity as modified, which means Entity Framework will generate an update statement that affects all columns. This is simpler when you want to update all fields in the entity but might be less efficient if only a few fields need to be updated.
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
