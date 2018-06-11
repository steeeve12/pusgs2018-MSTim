using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace RentApp.Models.Entities
{
    public class Rent
    {
        public int Id { get; set; }


        [Display(Name = "Start")]
        [DataType(DataType.Date)]
        public DateTime? Start { get; set; }


        [Display(Name = "End")]
        [DataType(DataType.Date)]
        public DateTime? End { get; set; }


        public virtual Branch Branch { get; set; }
        public virtual Vehicle Vehicle { get; set; }
    }
}