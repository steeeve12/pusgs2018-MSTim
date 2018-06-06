using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace RentApp.Models.Entities
{
    public class Impression
    {
        public int Id { get; set; }
        public string Comment { get; set; }
        public int Grade { get; set; }
        public DateTime? Time { get; set; }
        public virtual AppUser AppUser { get; set; }
    }
}