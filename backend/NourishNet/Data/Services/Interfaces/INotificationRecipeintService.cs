using NourishNet.Models;

namespace NourishNet.Data.Services.Interfaces
{
    public interface INotificationRecipeintService
    {
        Task<List<NotificationRecipient>> GetAll();
        Task<NotificationRecipient> GetById(int id);
        Task Add(NotificationRecipient notificationRecipient);
        Task<string> UpdateById(int id, NotificationRecipient notificationRecipient);
        Task DeleteById(int id);
    }
}
