using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RentApp.Models.Entities
{
    public class VehicleType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual List<Vehicle> Vehicles { get; set; }
    }
}