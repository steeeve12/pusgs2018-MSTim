﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RentApp.Models.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public DateTime? Birthday { get; set; }
        public string PersonalDocument { get; set; }
        public bool Activated { get; set; }
        public Rent RentAccount { get; set; }
    }
}