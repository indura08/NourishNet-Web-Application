using NourishNet.Models;

namespace NourishNet.Data.Services.Interfaces
{
    public interface IDonorService
    {
        Task<List<Donor>> GetAll();
        Task<Donor> GetDonorById(int id);
        Task AddNewDonor(Donor donor);
        Task<string> UpdateDonorById(int id, Donor donor);
        Task Deletedonor(string id);

       
    }
}
