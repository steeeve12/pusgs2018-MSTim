using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using RentApp.Models.Entities;
using RentApp.Persistance;
using RentApp.Persistance.UnitOfWork;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Controllers
{
    public class VehiclesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public VehiclesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Vehicles/idService
        public IEnumerable<Vehicle> GetVehicles(int idService, int pageIndex)
        {
            return unitOfWork.Vehicles.GetAll(idService, pageIndex, 9);
        }

        // GET: api/Vehicles/idService
        public IEnumerable<Vehicle> GetVehicles(int idService)
        {
            return unitOfWork.Vehicles.GetAll(idService);
        }

        // GET: api/Vehicles/idService
        public IEnumerable<Vehicle> GetVehicles(int idService, string search)
        {
            if(search == null)
            {
                return unitOfWork.Vehicles.GetAll(idService);
            }
            return unitOfWork.Vehicles.GetAll(idService, search);
        }

        // GET: api/Vehicles/idVehicle
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult GetVehicle(int idVehicle)
        {
            Vehicle vehicle = unitOfWork.Vehicles.Get(idVehicle);
            if (vehicle == null)
            {
                return NotFound();
            }

            return Ok(vehicle);
        }

        // PUT: api/Vehicles/5
        [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVehicle(Vehicle vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }         

            try
            {
                unitOfWork.Vehicles.Update(vehicle);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleExists(vehicle.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        public class PutVehicleBindingModel
        {
            [Required]
            public string Email { get; set; }
        }

        // POST: api/Vehicles
        [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult PostVehicle(Vehicle vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string[] fullDescription = vehicle.Description.Split('#');

            int serId = int.Parse(fullDescription[0]);

            if (fullDescription[1] == "__empty__")
                vehicle.Description = "";
            else
                vehicle.Description = fullDescription[1];

            Service ser = unitOfWork.Services.Get(serId);
            ser.Vehicles.Add(vehicle);

            unitOfWork.Vehicles.Add(vehicle);
            unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = vehicle.Id }, vehicle);
        }

        // DELETE: api/Vehicles/5
        [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult DeleteVehicle(int id)
        {
            var list = unitOfWork.Rents.GetAll(id);

            list = list.OrderBy(r => r.Start);

            foreach(Rent r in list)
            {
                if(r.Start <= DateTime.Now && r.End >= DateTime.Now)
                {
                    return BadRequest("Vehicle is in use!");
                }
            }


            // delete all
            foreach (Rent r in list)
            {
                foreach(AppUser u in unitOfWork.AppUsers.GetAll())
                {
                    if (u.Rents.Remove(r))
                    {
                        break;
                    }
                }

                unitOfWork.Rents.Remove(r);
            }


            Vehicle vehicle = unitOfWork.Vehicles.Get(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            foreach(Service s in unitOfWork.Services.GetAll())
            {
                if (s.Vehicles.Remove(vehicle))
                {
                    break;
                }
            }

            unitOfWork.Vehicles.Remove(vehicle);
            unitOfWork.Complete();

            return Ok(vehicle);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VehicleExists(int id)
        {
            return unitOfWork.Vehicles.Get(id) != null;
        }
    }
}