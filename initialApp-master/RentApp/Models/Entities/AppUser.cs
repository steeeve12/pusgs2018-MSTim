﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace RentApp.Models.Entities
{
    public class AppUser
    {
        public int Id { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        public DateTime? Birthday { get; set; }

        public string PersonalDocument { get; set; }

        public bool Activated { get; set; }

        public bool Forbidden { get; set; }

        public virtual List<Rent> Rents { get; set; }
    }
}