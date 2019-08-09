using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace All_Assignments.Models.Assignment10Models
{
    public class City
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [StringLength(80, MinimumLength = 2, ErrorMessage = "The name of the city has to be between 2 to 80 characters long.")]
        public string Name { get; set; }

        [Required]
        [StringLength(12)]
        public string Population { get; set; }

        public List<Person> People { get; set; }

        public Country Country { get; set; }
    }
}
