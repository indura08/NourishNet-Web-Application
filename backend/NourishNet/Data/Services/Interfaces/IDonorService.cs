using NourishNet.Models;

namespace NourishNet.Data.Services.Interfaces
{
    public interface IDonorService
    {
        Task<List<Donor>> GetAll();
        Task<Donor> GetDonorById(string id);
        Task AddNewDonor(Donor donor);
        Task<string> UpdateDonorById(string id, Donor donor);
        Task Deletedonor(string id);

       
    }
}
