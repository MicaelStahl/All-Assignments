using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace All_Assignments.Models.Assignment10Models
{
    public class Student
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 2, ErrorMessage = "The firstname has to be between 2 to 20 characters long.")]
        [Display(Name = "Firstname")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 2, ErrorMessage = "The lastname has to be between 2 to 30 characters long.")]
        [Display(Name = "Lastname")]
        public string LastName { get; set; }


    }
}
