using NourishNet.Models;
using NourishNet.Models.DTOs;

namespace NourishNet.Data.Services.Interfaces
{
    public interface IFoodListing
    {
        Task<List<FoodListing>> GetAll();
        Task Add(FoodListingVM foodListing);
        Task<FoodListing> GetById(int id);
        Task<string> UpdateByID(int id , FoodListing foodListing);
        Task<string> DeleteById(int id);
        Task SaveChanges();
    }
}
