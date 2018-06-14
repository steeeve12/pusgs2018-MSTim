using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace RentApp.Models.Entities
{
    public class Vehicle
    {
        public int Id { get; set; }


        [Required]
        public string Model { get; set; }


        [Required]
        public string Manufactor { get; set; }

        [Required]
        [Range((int)1970, (int)2018)]
        public int Year { get; set; }


        [Required(AllowEmptyStrings = true)]
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string Description { get; set; }

        [Required]
        [Range(0.0, 100.0)]
        public decimal PricePerHour { get; set; }


        public bool Unavailable { get; set; }
        public string Images { get; set; }

        [ForeignKey("VehicleType")]
        public int VehicleTypeId { get; set; }
        public virtual VehicleType VehicleType { get; set; }
    }
}