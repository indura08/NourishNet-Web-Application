using NourishNet.Models;

namespace NourishNet.Data.Services.Interfaces
{
    public interface INOtificationDonorService
    {
        Task<List<NotificationDonor>> GetAll();
        Task Add(NotificationDonor notificaionono);
        Task<NotificationDonor> GetById(int id);
        Task<string> UpdateById(int id, NotificationDonor notificationDonor);
        Task DeleteById(int id);
    }
}
