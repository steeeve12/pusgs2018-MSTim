﻿using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RentApp.Persistance.Repository
{
    public class RentRepository : Repository<Rent, int>, IRentRepository
    {
        public RentRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<Rent> GetAll(int pageIndex, int pageSize)
        {
            return RADBContext.Rents.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }

        public IEnumerable<Rent> GetAll(int idVehicle)
        {
            return RADBContext.Rents.Where(r => r.VehicleId == idVehicle).ToList();
        }

        public IEnumerable<Rent> GetAllUserRents(string email)
        {
            AppUser appU = RADBContext.AppUsers.First(u => u.Email == email);
            return appU.Rents.Where(r => r.Start > DateTime.Now.Date);
        }

        public bool IsFirstRentEnded(string email, string role, int idService)
        {
            AppUser appUser = RADBContext.AppUsers.First(a => a.Email == email);
            Service s = RADBContext.Services.First(ser => ser.Id == idService);
            List<Vehicle> vehicles = s.Vehicles;
            List<Rent> listOfRents = appUser.Rents.OrderBy(r => r.Start).ToList();

            if (role == "AppUser")
            {
                if (listOfRents.Count > 0)
                {
                    foreach (Rent r in listOfRents)
                    {
                        if (vehicles.Contains(r.Vehicle))
                        {
                            if (r.End <= DateTime.Now.Date)    // Date vrati 12:00:00 AM, a tako se pamte i datumi za rent
                            {
                                return true;
                            }
                        }
                    }
                }
                else if (appUser.Forbidden)
                {
                    return true;
                }
            }
            else
            {
                return true;
            }

            return false;
        }

        public bool TryReserve(DateTime start, DateTime end, int idVehicle)
        {
            var temp = RADBContext.Rents.Where(r => r.VehicleId == idVehicle);

            List<Rent> listOfRents = temp.OrderBy(r => r.Start).ToList();

            int cnt = listOfRents.Count();

            if (cnt == 0)
            {
                return true;
            }
            else if (cnt == 1)
            {
                if (end < listOfRents.First().Start || start > listOfRents.First().End)
                {
                    return true;
                }
            }
            else
            {

                if (start > listOfRents.Last().End)
                {
                    return true;
                }

                Rent tempItem = listOfRents.First();
                bool isFirst = true;

                foreach (Rent r in listOfRents)
                {
                    if (start < r.Start && end < r.Start)
                    {
                        if (isFirst)
                        {
                            return true;
                        }
                        else if (start > tempItem.End)
                        {
                            return true;
                        }
                    }

                    tempItem = r;
                    isFirst = false;
                }
            }

            return false;
        }

        Rent IRentRepository.FindRent(int id)
        {
            return RADBContext.Rents.First(r => r.Id == id);
        }

        protected RADBContext RADBContext { get { return context as RADBContext; } }
    }
}