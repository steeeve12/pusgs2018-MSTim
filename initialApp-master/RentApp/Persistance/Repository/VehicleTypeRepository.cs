using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RentApp.Persistance.Repository
{
    public class VehicleTypeRepository : Repository<VehicleType, int>, IVehicleTypeRepository
    {
        public VehicleTypeRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<VehicleType> GetAll(int pageIndex, int pageSize)
        {
            return RADBContext.VehicleTypes.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }


        public bool Exists(string name)
        {
            try
            {
                VehicleType v = RADBContext.VehicleTypes.First(vt => vt.Name == name);
            }
            catch
            {
                return false;
            }

            return true;
        }

        protected RADBContext RADBContext { get { return context as RADBContext; } }
    }
}