using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RentApp.Persistance.Repository
{
    public class ServiceRepository : Repository<Service, int>, IServiceRepository
    {
        public ServiceRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<Service> GetAll(int pageIndex, int pageSize)
        {
            return RADBContext.Services.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }

        public int GetCountNotApproved()
        {
            int cnt = 0;

            using (var dataContext = RADBContext)
            {
                foreach (Service s in dataContext.Services)
                {
                    if (!s.Approved)
                        cnt++;
                }
            }

            return cnt;
        }

        protected RADBContext RADBContext { get { return context as RADBContext; } }
    }
}