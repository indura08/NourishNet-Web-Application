using Microsoft.EntityFrameworkCore;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;

namespace NourishNet.Data.Services
{
    public class RecipientService : IRecipientService
    {
        public readonly AppDBContext _dbContext;

        public RecipientService(AppDBContext dBContext) { 
            _dbContext = dBContext;
        }

        //methods 
        public async Task AddNewRecipient(Recipient recipient)
        {
            _dbContext.Recipients.Add(recipient);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteRecipientById(string id)
        {
            await _dbContext.Recipients.Where(recipient => recipient.Id == id).ExecuteDeleteAsync();
        }

        public async Task<List<Recipient>> GetAll()
        {
            return await _dbContext.Recipients.ToListAsync();
        }

        public async Task<Recipient> GetRecipientById(string id)
        {
            return await _dbContext.Recipients.FindAsync(id);
            
        }

        public async Task<string> UpdateRecipientById(string id, Recipient recipient)
        {
            var currentRecipient = await _dbContext.Recipients.FindAsync(id);
            if (currentRecipient != null)
            {
                _dbContext.Entry(currentRecipient).CurrentValues.SetValues(recipient);
                await _dbContext.SaveChangesAsync();
                return "Updated";
            }
            else {
                return "Error";
            }
        }
    }
}
