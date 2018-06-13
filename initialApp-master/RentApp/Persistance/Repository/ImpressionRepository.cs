using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RentApp.Persistance.Repository
{
    public class ImpressionRepository : Repository<Impression, int>, IImpressionRepository
    {
        public ImpressionRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<Impression> GetAll(int pageIndex, int pageSize)
        {
            return RADBContext.Impressions.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }

        protected RADBContext RADBContext { get { return context as RADBContext; } }
    }
}