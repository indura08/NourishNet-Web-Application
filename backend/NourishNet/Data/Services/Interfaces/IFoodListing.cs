using NourishNet.Models;

namespace NourishNet.Data.Services.Interfaces
{
    public interface IFoodListing
    {
        Task<List<FoodListing>> GetAll();
        Task Add(FoodListing foodListing);
        Task<FoodListing> GetById(int id);
        Task<string> UpdateByID(int id , FoodListing foodListing);
        Task<string> DeleteById(int id);
        Task SaveChanges();
    }
}
