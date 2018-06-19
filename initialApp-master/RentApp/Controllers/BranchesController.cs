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
    public class BranchesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public BranchesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Branches
        public IEnumerable<Branch> GetBranches(int idService)
        {
            return unitOfWork.Branches.GetAll(idService);
        }

        public IEnumerable<Branch> GetBranches()
        {
            return unitOfWork.Branches.GetAll();
        }

        // GET: api/Branches/5
        [ResponseType(typeof(Branch))]
        public IHttpActionResult GetBranch(int id)
        {
            Branch branch = unitOfWork.Branches.Get(id);
            if (branch == null)
            {
                return NotFound();
            }

            return Ok(branch);
        }

        [ResponseType(typeof(Branch))]
        public IHttpActionResult GetBranch(int idService, double lat, double lgt)
        {
            Branch branch = unitOfWork.Branches.Get(idService, lat, lgt);
            if (branch == null)
            {
                return NotFound();
            }

            return Ok(branch);
        }

        // PUT: api/Branches/5
        [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBranch(Branch branch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            try
            {
                unitOfWork.Branches.Update(branch);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BranchExists(branch.Id))
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

        // POST: api/Branches
        [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(Branch))]
        public IHttpActionResult PostBranch(Branch branch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(branch.Latitude < 0 || branch.Longitude < 0)
                return BadRequest(ModelState);

            string[] fullAddress = branch.Address.Split('#');

            int serId = int.Parse(fullAddress[0]);

            if (fullAddress[1] == "__empty__")
                return BadRequest(ModelState);
            else
                branch.Address = fullAddress[1];

            Service ser = unitOfWork.Services.Get(serId);
            ser.Branches.Add(branch);

            unitOfWork.Branches.Add(branch);
            unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = branch.Id }, branch);
        }

        // DELETE: api/Branches/5
        [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(Branch))]
        public IHttpActionResult DeleteBranch(int id)
        {
            var list = unitOfWork.Rents.GetAll();

            // delete all
            foreach (Rent r in list)
            {
                if (r.Branch1Id == id || r.Branch2Id == id)
                {
                    if (r.Start <= DateTime.Now && r.End >= DateTime.Now)
                    {
                        return BadRequest("Branch is in use!");
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

            Branch branch = unitOfWork.Branches.Get(id);
            if (branch == null)
            {
                return NotFound();
            }

            foreach (Service s in unitOfWork.Services.GetAll())
            {
                if (s.Branches.Remove(branch))
                {
                    break;
                }
            }

            unitOfWork.Branches.Remove(branch);
            unitOfWork.Complete();

            return Ok(branch);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BranchExists(int id)
        {
            return unitOfWork.Branches.Get(id) != null;
        }
    }
}