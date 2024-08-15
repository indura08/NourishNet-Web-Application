using NourishNet.Models;

namespace NourishNet.Data.Services.Interfaces
{
    public interface IDonationHistory
    {
        Task<List<DonationHistory>> GetAll();

    }
}
