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

        public DateTime? Start { get; set; }

        public DateTime? End { get; set; }

        [ForeignKey("Branch1")]
        public int? Branch1Id { get; set; }
        public virtual Branch Branch1 { get; set; }

        [ForeignKey("Branch2")]
        public int? Branch2Id { get; set; }
        public virtual Branch Branch2 { get; set; }

        [ForeignKey("Vehicle")]
        public int? VehicleId { get; set; }
        public virtual Vehicle Vehicle { get; set; }
    }
}