using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace All_Assignments.Models.Assignment10Models
{
    public class Person
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

        [Required]
        [Range(12, 110, ErrorMessage = "The user has to be between 12 to 110 years old.")]
        public int Age { get; set; }

        [Required]
        [EmailAddress]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "E-mail")]
        public string Email { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        [DataType(DataType.PhoneNumber)]
        [Display(Name = "Phonenumber")]
        [Phone]
        public string PhoneNumber { get; set; }

        public City City { get; set; }
    }
}
