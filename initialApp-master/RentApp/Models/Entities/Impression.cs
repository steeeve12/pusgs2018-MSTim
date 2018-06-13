using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models.Entities
{
    public class Impression
    {
        public int Id { get; set; }

        [Required(AllowEmptyStrings = true)]
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string Comment { get; set; }


        [Range(1, 5)]
        public int Grade { get; set; }

        public DateTime? Time { get; set; }


        public virtual AppUser AppUser { get; set; }
    }
}