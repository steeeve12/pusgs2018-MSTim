﻿using System;
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

//    [RoutePrefix("api/Rents")]
    public class RentsController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
        private object syncLock = new object();

        public RentsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Rents
        public IEnumerable<Rent> GetRents()
        {
            return unitOfWork.Rents.GetAll();
        }

        public IEnumerable<Rent> GetRents(int idVehicle)
        {
            return unitOfWork.Rents.GetAll(idVehicle);
        }

        public IEnumerable<Rent> GetAllUserRents(string email, int tt)
        {
            return unitOfWork.Rents.GetAllUserRents(email);
        }


        [Authorize(Roles = "Admin, Manager, AppUser")]
        public bool GetIsFirstRentEnded(string email, string role, int idService)
        {
            if(email == "null" || role == null)
            {
                return false;
            }
            bool ret = unitOfWork.Rents.IsFirstRentEnded(email, role, idService);

            AppUser appUser = unitOfWork.AppUsers.Get(email);

            if (role == "AppUser" && ret && !appUser.Forbidden)
            {
                appUser.Forbidden = true;
                unitOfWork.AppUsers.Update(appUser);
                unitOfWork.Complete();
            }

            return ret;
        }

        [Authorize(Roles = "Admin, Manager, AppUser")]
        public bool GetReserve(DateTime start, DateTime end, int idVehicle)
        {
            lock (syncLock)
            {
                return unitOfWork.Rents.TryReserve(start, end, idVehicle);
            }
        }


        // GET: api/Rents/5
        [ResponseType(typeof(Rent))]
        public IHttpActionResult GetRent(int id)
        {
            Rent rent = unitOfWork.Rents.Get(id);
            if (rent == null)
            {
                return NotFound();
            }

            return Ok(rent);
        }

        // PUT: api/Rents/5
        [Authorize(Roles = "Admin, Manager, AppUser")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRent(int id, Rent rent)
        {
            lock (syncLock)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != rent.Id)
                {
                    return BadRequest();
                }



                try
                {
                    unitOfWork.Rents.Update(rent);
                    unitOfWork.Complete();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!RentExists(id))
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
        }

        // POST: api/Rents
        [Authorize(Roles = "Admin, Manager, AppUser")]
        [ResponseType(typeof(Rent))]
        public IHttpActionResult PostRent(Rent rent)
        {
            lock (syncLock)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (rent.End < rent.Start)
                    return BadRequest("Start date must be earlier then return date!");

                unitOfWork.Rents.Add(rent);
                unitOfWork.Complete();

                return CreatedAtRoute("DefaultApi", new { id = rent.Id }, rent);
            }
        }

        // DELETE: api/Rents/5
        [Authorize(Roles = "Admin, Manager, AppUser")]
        [ResponseType(typeof(Rent))]
        public IHttpActionResult DeleteRent(int id)
        {
            Rent rent = unitOfWork.Rents.Get(id);
            if (rent == null)
            {
                return NotFound();
            }

            unitOfWork.Rents.Remove(rent);
            unitOfWork.Complete();

            return Ok(rent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RentExists(int id)
        {
            return unitOfWork.Rents.Get(id) != null;
        }
    }
}