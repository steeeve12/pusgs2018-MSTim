using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentApp.Persistance.Repository
{
    public interface IImpressionRepository : IRepository<Impression, int>
    {
        IEnumerable<Impression> GetAll(int pageIndex, int pageSize);
        IEnumerable<Impression> GetAll(int id);
        Impression GetFirst(int idUser);
        Impression GetFirstWithoutGrade(int idUser);
    }
}
