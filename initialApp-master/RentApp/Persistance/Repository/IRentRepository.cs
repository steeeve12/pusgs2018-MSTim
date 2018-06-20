using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentApp.Persistance.Repository
{
    public interface IRentRepository : IRepository<Rent, int>
    {
        IEnumerable<Rent> GetAll(int pageIndex, int pageSize);
        IEnumerable<Rent> GetAll(int idVehicle);
        IEnumerable<Rent> GetAllUserRents(string email);
        bool IsFirstRentEnded(string email);
        bool TryReserve(DateTime start, DateTime end, int idVehicle);
        Rent FindRent(int id);
    }
}
