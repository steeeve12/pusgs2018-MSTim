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
//      [Authorize(Roles = "Admin, Manager")]
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
        //        [Authorize(Roles = "Admin, Manager")]
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
 //       [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult DeleteVehicle(int id)
        {
            Vehicle vehicle = unitOfWork.Vehicles.Get(id);
            if (vehicle == null)
            {
                return NotFound();
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