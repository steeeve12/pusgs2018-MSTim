using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RentApp.Persistance.Repository
{
    public class VehicleRepository : Repository<Vehicle, int>, IVehicleRepository
    {
        public VehicleRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<Vehicle> GetAll(int id, int pageIndex, int pageSize)
        {
            Service s = RADBContext.Services.First(s1 => s1.Id == id);
            return s.Vehicles.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }

        public IEnumerable<Vehicle> GetAll(int id)
        {
            Service s = RADBContext.Services.First(s1 => s1.Id == id);
            return s.Vehicles;
        }

        public IEnumerable<Vehicle> GetAll(int id, string search)
        {
            Service s = RADBContext.Services.First(s1 => s1.Id == id);
            List<Vehicle> vehicles = new List<Vehicle>();

            foreach(Vehicle vehicle in s.Vehicles)
            {
                if (vehicle.Manufactor.Contains(search))
                    vehicles.Add(vehicle);
                else if (vehicle.Model.Contains(search))
                    vehicles.Add(vehicle);
                else if (vehicle.VehicleType.Name.Contains(search))
                    vehicles.Add(vehicle);
                else if (vehicle.Year.ToString().Contains(search))
                    vehicles.Add(vehicle);
                else if (vehicle.PricePerHour.ToString().Contains(search))
                    vehicles.Add(vehicle);
            }

            return vehicles;
        }

        protected RADBContext RADBContext { get { return context as RADBContext; } }
    }
}