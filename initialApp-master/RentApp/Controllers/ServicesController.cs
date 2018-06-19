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
using System.Net.Mail;

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
        // [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutService(Service service)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Service uS = unitOfWork.Services.Get(service.Id);   // bez ovih 6 linija baca exception u Repository na update-u
            uS.Approved = service.Approved;                     // Attaching an entity of type 'X' failed because another entity of the same type already has the same primary key value
            uS.Description = service.Description;               
            uS.Email = service.Email;
            uS.Logo = service.Logo;
            uS.Name = service.Name;

            try
            {
                unitOfWork.Services.Update(uS);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceExists(uS.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            if(service.Approved == true)
            {
                MailMessage mail = new MailMessage("rentAVehicle@gmail.com", "steeeveize@gmail.com");   // ovo izgleda ne vredi, tj. vredi drugi parametar
                SmtpClient client = new SmtpClient();
                client.Port = 587;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                //client.Credentials = new NetworkCredential("steeeveize@gmail.com", "sifra");     // ovo treba iskoristiti i onda posalje s tog mejla na onaj gore drugi parametar
                client.Host = "smtp.gmail.com";
                client.EnableSsl = true;
                mail.Subject = "Service approved";
                mail.Body = "The service that you have made has been approved by our administrators! \n You are now able to add vehicles and branches!";
                client.Send(mail);
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