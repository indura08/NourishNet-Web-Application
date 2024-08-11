using Microsoft.EntityFrameworkCore;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;

namespace NourishNet.Data.Services
{
    public class NotificationRecipientService : INotificationRecipeintService
    {
        private readonly AppDBContext _dbContext;

        public NotificationRecipientService(AppDBContext dbContext) { 
            _dbContext = dbContext;
        }

        public async Task Add(NotificationRecipient notificationRecipient)
        {
            _dbContext.RecipientNotifications.Add(notificationRecipient);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteById(int id)
        {
            await _dbContext.RecipientNotifications.Where(notification => notification.Id == id).ExecuteDeleteAsync();
        }

        public async Task<List<NotificationRecipient>> GetAll()
        {
            return await _dbContext.RecipientNotifications.ToListAsync();
        }

        public async Task<NotificationRecipient> GetById(int id)
        {
            return await _dbContext.RecipientNotifications.FindAsync(id);
        }

        public async Task<string> UpdateById(int id, NotificationRecipient notificationRecipient)
        {
            var currentNotification = await _dbContext.RecipientNotifications.FindAsync(id);

            if (currentNotification != null)
            {
                _dbContext.Entry(currentNotification).CurrentValues.SetValues(notificationRecipient);
                _dbContext.SaveChanges();
                return "Success";
            }
            else {
                return "Error";
            }
        }
    }
}
