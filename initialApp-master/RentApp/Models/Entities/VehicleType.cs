using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RentApp.Models.Entities
{
    public class VehicleType
    {
        public int Id { get; set; }


        [Required]
        [DisplayName("Name")]
        public string Name { get; set; }
        //public virtual List<Vehicle> Vehicles { get; set; }
    }
}