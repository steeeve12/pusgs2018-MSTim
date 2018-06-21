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
using RentApp.Hubs;

namespace RentApp.Controllers
{
    public class ServicesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
        public static int ServiceCount { get; set; }

        public ServicesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Services
        public IEnumerable<Service> GetServices()
        {
            ServiceCount = unitOfWork.Services.GetAll().Where(s => s.Approved == false).Count();

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
        [Authorize(Roles = "Admin, Manager")]
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
                MailMessage mail = new MailMessage("rentappms@gmail.com", "steeeveize@gmail.com"); // drugi parametar service.Creator.Email umesto moje mejl adrese 
                SmtpClient client = new SmtpClient();
                client.Port = 587;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential("rentappms@gmail.com", "mitarsteva.12");
                client.Host = "smtp.gmail.com";
                client.EnableSsl = true;
                mail.Subject = "Service approved";
                mail.Body = "The service that you have made has been approved by our administrators! \n You are now able to add vehicles and branches!";
                client.Send(mail);

                // notification ----------------------------------------------------------------------------------------
                NotificationsHub.NotifyForService(--ServiceCount);
            }
            else
            {
                // notification ----------------------------------------------------------------------------------------
                NotificationsHub.NotifyForService(++ServiceCount);
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Services
        [Authorize(Roles = "Admin, Manager")]
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

            // notification ----------------------------------------------------------------------------------------
            NotificationsHub.NotifyForService(++ServiceCount);

            return CreatedAtRoute("DefaultApi", new { id = service.Id }, service);
        }

        // DELETE: api/Services/5
        [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(Service))]
        public IHttpActionResult DeleteService(int id)
        {
            var ser = unitOfWork.Services.Get(id);

            if(!ser.Approved)
                // notification ----------------------------------------------------------------------------------------
                NotificationsHub.NotifyForService(--ServiceCount);

            var listOfRents = unitOfWork.Rents.GetAll();

            List<Branch> listOfBranches = new List<Branch>();

            foreach(Branch b in ser.Branches)
            {
                listOfBranches.Add(b);
            }

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

            List<Impression> impressions = new List<Impression>();
            foreach(Impression i in ser.Impressions)
            {
                impressions.Add(i);
            }

            foreach (Impression i in impressions)
            {
                unitOfWork.Impressions.Remove(i);
            }

            List<Vehicle> vehicles = new List<Vehicle>();
            foreach (Vehicle v in ser.Vehicles)
            {
                vehicles.Add(v);
            }

            foreach (Vehicle v in vehicles)
            {
                unitOfWork.Vehicles.Remove(v);
            }

            unitOfWork.Services.Remove(ser);
            unitOfWork.Complete();

            return Ok(ser);
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