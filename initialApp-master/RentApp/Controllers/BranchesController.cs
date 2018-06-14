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

        // PUT: api/Branches/5
 //       [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBranch(int id, Branch branch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != branch.Id)
            {
                return BadRequest();
            }
            

            try
            {
                unitOfWork.Branches.Update(branch);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BranchExists(id))
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
  //      [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(Branch))]
        public IHttpActionResult PostBranch(Branch branch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.Branches.Add(branch);
            unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = branch.Id }, branch);
        }

        // DELETE: api/Branches/5
 //       [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(Branch))]
        public IHttpActionResult DeleteBranch(int id)
        {
            Branch branch = unitOfWork.Branches.Get(id);
            if (branch == null)
            {
                return NotFound();
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