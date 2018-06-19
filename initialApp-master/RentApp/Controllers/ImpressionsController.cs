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

namespace RentApp.Controllers
{

    public class ImpressionsController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public ImpressionsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Impressions
        public IEnumerable<Impression> GetImpressions()
        {
            return unitOfWork.Impressions.GetAll();
        }

        // GET: api/Vehicles/idService
        public IEnumerable<Impression> GetImpressions(int idService)
        {
            return unitOfWork.Impressions.GetAll(idService);
        }

        // GET: api/Impressions/5
        [ResponseType(typeof(Impression))]
        public IHttpActionResult GetImpression(int id)
        {
            Impression impression = unitOfWork.Impressions.Get(id);
            if (impression == null)
            {
                return NotFound();
            }

            return Ok(impression);
        }

        // PUT: api/Impressions/5
        [Authorize(Roles = "Admin, Manager, AppUser")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutImpression(Impression impression)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Impression i = null;
            if (impression.Grade == 0)
                i = unitOfWork.Impressions.GetFirst(impression.AppUser.Id);
            else
                i = unitOfWork.Impressions.GetFirstWithoutGrade(impression.AppUser.Id);

            if(i == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            i.Grade = impression.Grade;

            try
            {
                unitOfWork.Impressions.Update(i);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImpressionExists(i.Id))
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

        // POST: api/Impressions/Post
        [Authorize(Roles = "Admin, Manager, AppUser")]
        [ResponseType(typeof(Impression))]
        public IHttpActionResult PostImpression(Impression impression)
        {
            impression.Time = DateTime.Now;

            AppUser currentUser = null;

            foreach (var item in unitOfWork.AppUsers.GetAll())
            {
                if (item.Email == impression.AppUser.Email)
                {
                    currentUser = item;
                    break;
                }
            }

            impression.AppUser = currentUser;

            if (!ModelState.IsValid || currentUser == null)
            {
                return BadRequest(ModelState);
            }

            string[] fullComment = impression.Comment.Split('#');

            int serId = int.Parse(fullComment[0]);

            try
            {
                impression.Comment = fullComment[1];
            }
            catch
            {
                impression.Comment = "";
            }

            Impression i = unitOfWork.Impressions.GetFirst(impression.AppUser.Id);
            if(i != null)
            {
                i.Grade = impression.Grade;
                unitOfWork.Impressions.Update(i);
                impression.Grade = 0;
            }

            Service ser = unitOfWork.Services.Get(serId);

            ser.Impressions.Add(impression);

            unitOfWork.Impressions.Add(impression);
            unitOfWork.Complete();

            return Ok();
        //    return CreatedAtRoute("DefaultApi", new { id = impression.Id }, impression);
        }

        // DELETE: api/Impressions/5
        [Authorize(Roles = "Admin, Manager, AppUser")]
        [ResponseType(typeof(Impression))]
        public IHttpActionResult DeleteImpression(int id)
        {
            Impression impression = unitOfWork.Impressions.Get(id);
            if (impression == null)
            {
                return NotFound();
            }

            unitOfWork.Impressions.Remove(impression);
            unitOfWork.Complete();

            return Ok(impression);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ImpressionExists(int id)
        {
            return unitOfWork.Impressions.Get(id) != null;
        }
    }
}