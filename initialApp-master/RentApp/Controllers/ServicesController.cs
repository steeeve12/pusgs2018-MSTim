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
using System.Threading.Tasks;

namespace RentApp.Controllers
{
    public class ServicesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
        

        public ServicesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Services
        public IEnumerable<Service> GetServices()
        {
            return unitOfWork.Services.GetAll();
        }

        // GET: api/Services/5
        [ResponseType(typeof(Service))]
        public IHttpActionResult GetService(int id)
        {
            Service service = unitOfWork.Services.Get(id);
            if (service == null)
            {
                return NotFound();
            }

            return Ok(service);
        }

        // PUT: api/Services/5
 //       [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutService(Service service)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                unitOfWork.Services.Update(service);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceExists(service.Id))
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

        // POST: api/Services
//        [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(Service))]
        public IHttpActionResult PostService(Service service)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (service.Impressions == null)
            {
                service.Impressions = new List<Impression>();
            }

            if(service.Branches == null)
            {
                service.Branches = new List<Branch>();
            }

            if(service.Vehicles == null)
            {
                service.Vehicles = new List<Vehicle>();
            }

            unitOfWork.Services.Add(service);
            unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = service.Id }, service);
        }

        // DELETE: api/Services/5
//        [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(Service))]
        public IHttpActionResult DeleteService(int id)
        {

            var ser = unitOfWork.Services.Get(id);
            var listOfRents = unitOfWork.Rents.GetAll();
            var listOfBranches = ser.Branches;

            foreach (Branch b in listOfBranches)
            {
                
                foreach (Rent r in listOfRents)
                {
                    if (r.Branch1Id == b.Id || r.Branch2Id == b.Id)
                    {
                        if (r.Start <= DateTime.Now && r.End >= DateTime.Now)
                        {
                            return BadRequest("Service is in use!");
                        }

                        foreach (AppUser u in unitOfWork.AppUsers.GetAll())
                        {
                            if (u.Rents.Remove(r))
                            {
                                break;
                            }
                        }

                        unitOfWork.Rents.Remove(r);
                    }
                }

                unitOfWork.Branches.Remove(b);
            }

            Service service = unitOfWork.Services.Get(id);
            if (service == null)
            {
                return NotFound();
            }

            foreach (Impression i in service.Impressions)
            {
                unitOfWork.Impressions.Remove(i);
            }

            foreach (Vehicle v in service.Vehicles)
            {
                unitOfWork.Vehicles.Remove(v);
            }

            unitOfWork.Services.Remove(service);
            unitOfWork.Complete();

            return Ok(service);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ServiceExists(int id)
        {
            return unitOfWork.Services.Get(id) != null;
        }
    }
}