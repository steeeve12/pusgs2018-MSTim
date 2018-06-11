using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RentApp.Models.Entities
{
    public class Service
    {
        public int Id { get; set; }


        [Required]
        [DisplayName("Name")]
        public string Name { get; set; }


        [Required]
        [DisplayName("Logo")]
        public string Logo { get; set; }


        [Required]
        [EmailAddress]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Email")]
        public string Email { get; set; }


        [Required]
        [DisplayName("Description")]
        public string Description { get; set; }


        public bool Approved { get; set; }
        public virtual List<Vehicle> Vehicles { get; set; }
        public virtual List<Branch> Branches { get; set; }
        public virtual List<Impression> Impressions { get; set; }
    }
}