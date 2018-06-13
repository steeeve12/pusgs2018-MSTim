using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RentApp.Persistance.Repository
{
    public class BranchRepository : Repository<Branch, int>, IBranchRepository
    {
        public BranchRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<Branch> GetAll(int pageIndex, int pageSize)
        {
            return RADBContext.Branches.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }

        public IEnumerable<Branch> GetAll(int id)
        {
            Service s = RADBContext.Services.First(s1 => s1.Id == id);
            return s.Branches;
        }

        protected RADBContext RADBContext { get { return context as RADBContext; } }
    }
}