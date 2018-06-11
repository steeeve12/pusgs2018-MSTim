using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace RentApp.Models.Entities
{
    public class Impression
    {
        public int Id { get; set; }


        [DisplayName("Comment")]
        [Required(AllowEmptyStrings = true)]
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string Comment { get; set; }


        [DisplayName("Grade")]
        [Range(1, 10)]
        public int Grade { get; set; }


        [Display(Name = "Time")]
        [DataType(DataType.Date)]
        public DateTime? Time { get; set; }


        public virtual AppUser AppUser { get; set; }
    }
}