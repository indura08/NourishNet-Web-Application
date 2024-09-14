using Microsoft.EntityFrameworkCore;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;

namespace NourishNet.Data.Services
{
    public class NotificationDonorService : INOtificationDonorService
    {
        private readonly AppDBContext _dbContext;

        public NotificationDonorService(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Add(NotificationDonor notificationDonor)
        {
            var donor = await _dbContext.Donors.FindAsync(notificationDonor.DonorId);
            notificationDonor.Donor = donor;

            _dbContext.DonorNotifications.AddAsync(notificationDonor);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteById(int id)
        {
            await _dbContext.DonorNotifications.Where(notification => notification.Id == id).ExecuteDeleteAsync();
        }

        public async Task<List<NotificationDonor>> GetAll()
        {
            return await _dbContext.DonorNotifications.ToListAsync();
        }

        public async Task<NotificationDonor> GetById(int id)
        {
            var currentNotification = await _dbContext.DonorNotifications.FindAsync(id);

            return currentNotification;
        }

        public async Task<string> UpdateById(int id, NotificationDonor notificationDonor)
        {
            var currentNotification = await _dbContext.DonorNotifications.FindAsync(id);

            if (currentNotification != null)
            {
                _dbContext.Entry(currentNotification).CurrentValues.SetValues(notificationDonor);
                await _dbContext.SaveChangesAsync();

                return "Updated";
            }
            else
            {
                return "Error";
            }
        }
    }
}
