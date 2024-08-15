using NourishNet.Models;

namespace NourishNet.Data.Services.Interfaces
{
    public interface IDonationHistory
    {
        Task<List<DonationHistory>> GetAll();
        Task<DonationHistory> GetById(int id);
        Task AddNewDonoationHistory(DonationHistory donationHistory);
        Task<string> UpdateDonationHistroyById(int id, DonationHistory donationHistory);
        Task DeleteDonationHistory(int id);

    }
}
