using RentApp.Persistance.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentApp.Persistance.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IServiceRepository Services { get; set; }
        IVehicleRepository Vehicles { get; set; }
        IAppUserRepository Users { get; set; }
        IBranchRepository Branches { get; set; }
        IRentRepository Rents { get; set; }
        IVehicleTypeRepository VehicleTypes { get; set; }
        int Complete();
    }
}
