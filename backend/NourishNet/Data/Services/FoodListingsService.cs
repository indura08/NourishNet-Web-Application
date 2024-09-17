using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;
using NourishNet.Models.DTOs;

namespace NourishNet.Data.Services
{
    public class FoodListingsService : IFoodListing
    {
        private readonly AppDBContext _dbContext;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public FoodListingsService(AppDBContext dbContext, IWebHostEnvironment webHostEnvironment) { 
            
            _dbContext = dbContext;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<List<FoodListing>> GetAll()
        {
            return await _dbContext.FoodListings.Include(f1 => f1.Donor).ToListAsync();
        }

        public async Task Add(FoodListingVM foodListing)
        {
            var donor = await _dbContext.Donors.FindAsync(foodListing.DonorId);

            var newFoodListingObject = new FoodListing
            {
                DonorId = foodListing.DonorId,
                Donor = donor,
                FoodType = foodListing.FoodType,
                Description = foodListing.Description,
                Quantity = foodListing.Quantity,
                PostedDate = foodListing.PostedDate,
                ExpiryDate = foodListing.ExpiryDate,
                CurrentStatus = foodListing.CurrentStatus,
            };

            if (foodListing.Image != null)
            {
                string uploadDir = Path.Combine(_webHostEnvironment.WebRootPath, "images");
                string fileName = foodListing.Image.FileName;
                string filePath = Path.Combine(uploadDir, fileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create)) { 
                    foodListing.Image.CopyTo(fileStream);
                }

                newFoodListingObject.ImagePath = fileName;
            };

            

            if (donor == null)
            {
                throw new Exception("Donor not found");
            }

            await _dbContext.FoodListings.AddAsync(newFoodListingObject);
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
