using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NourishNet.Data.Services.Interfaces;
using NourishNet.Models;

namespace NourishNet.Data.Services
{
    public class DonorService : IDonorService
    {
        private readonly AppDBContext _dbContext;
        private readonly UserManager<Donor> _userManager;

        public DonorService(AppDBContext dbContext , UserManager<Donor> userManager) { 
            _dbContext = dbContext;
            _userManager = userManager;
        }
        public async Task AddNewDonor(Donor donor)
        {
            _dbContext.Donors.Add(donor);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Deletedonor(string id)
        {
            await _dbContext.Donors.Where(donor => donor.Id == id).ExecuteDeleteAsync();
        }

        public async Task<List<Donor>> GetAll()
        {
            var DonorList = await _dbContext.Donors.ToListAsync();
            return DonorList;
        }

        public async Task<Donor> GetDonorById(string id)
        {
            return await _dbContext.Donors.FindAsync(id);
        }

        public async Task<string> UpdateDonorById(string id, Donor donor)
        {
            var currentDonor = await _userManager.FindByIdAsync(id);
            if (currentDonor != null)
            {
                _dbContext.Entry(currentDonor).State = EntityState.Detached;

                currentDonor.OrganizaTionName = donor.OrganizaTionName;
                currentDonor.OrganizationType = donor.OrganizationType;
                currentDonor.ContactPerson = donor.ContactPerson;
                currentDonor.Phone = donor.Phone;
                currentDonor.BaseDistrict = donor.BaseDistrict;
                currentDonor.BaseProvince = donor.BaseProvince;
                currentDonor.Address = donor.Address;
                currentDonor.OperatingHours = donor.OperatingHours;
                currentDonor.Email = donor.Email;
                currentDonor.UserName = donor.UserName;
                currentDonor.Role = donor.Role;
                currentDonor.UserType = donor.UserType;

                await _dbContext.SaveChangesAsync();

                var result = await _userManager.UpdateAsync(currentDonor);

                if (result.Succeeded)
                {
                    return "Updated";
                }
                else
                {
                    return $"Error Occurred: {string.Join(", ", result.Errors.Select(e => e.Description))}";
                }
            }
            else {
                return "Error Occured";
            }
        }
    }
}
