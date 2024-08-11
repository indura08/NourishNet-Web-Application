using NourishNet.Models;

namespace NourishNet.Data.Services.Interfaces
{
    public interface IRecipientService
    {
        Task<List<Recipient>> GetAll();
        Task<Recipient> GetRecipientById(string id);
        Task<string> UpdateRecipientById(string id, Recipient recipient);
        Task AddNewRecipient(Recipient recipient);
        Task DeleteRecipientById(string id);

    }
}
