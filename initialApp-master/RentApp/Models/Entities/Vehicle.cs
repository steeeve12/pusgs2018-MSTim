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
        [DisplayName("Model")]
        public string Model { get; set; }


        [Required]
        [DisplayName("Manufactor")]
        public string Manufactor { get; set; }


        [DisplayName("Year")]
        [Range((int)1900, (int)2020)]
        public int Year { get; set; }


        [Required]
        [DisplayName("Description")]
        public string Description { get; set; }


        [DisplayName("PricePerHour")]
        [Range(0.0, 100.0)]
        public decimal PricePerHour { get; set; }


        public bool Unavailable { get; set; }
        public List<string> Images { get; set; }
        public virtual VehicleType VehicleType { get; set; }
    }
}