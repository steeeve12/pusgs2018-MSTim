using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RentApp.Persistance.Repository
{
    public class AppUserRepository : Repository<AppUser, int>, IAppUserRepository
    {
        public AppUserRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<AppUser> GetAll(int pageIndex, int pageSize)
        {
            return RADBContext.AppUsers.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }

        public AppUser Get(string email)
        {
            return RADBContext.AppUsers.First(u => u.Email == email);
        }

        public int GetCountNotActivated()
        {
            int cnt = 0;

            using (var dataContext = RADBContext)
            {
                foreach (AppUser s in dataContext.AppUsers)
                {
                    if (!s.Activated)
                        cnt++;
                }
            }

            return cnt;
        }

        protected RADBContext RADBContext { get { return context as RADBContext; } }
    }
}