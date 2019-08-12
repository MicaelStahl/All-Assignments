using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace All_Assignments.ViewModels
{
    /// <summary>
    /// Naming it "AppUser10" to easier be able to distinguish it from other assignments.
    /// </summary>
    public class AppUser10 : IdentityUser
    {
        [Required]
        [Display(Name = "Username")]
        [StringLength(20, MinimumLength = 4, ErrorMessage = "The length of the username has to be between 4 to  20 characters long")]
        public override string UserName { get; set; }

        [Required]
        [Display(Name = "Firstname")]
        [StringLength(20, MinimumLength = 2, ErrorMessage = "The length of the firstname has to be between 2 to 20 characters.")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Lastname")]
        [StringLength(30, MinimumLength = 2, ErrorMessage = "The length of the lastname has to be between 2 to 30 characters.")]
        public string LastName { get; set; }

        [Required]
        [Range(18, 110, ErrorMessage = "You have to be between 18 to 110 years old.")]
        public int Age { get; set; }

        public string UserToken { get; set; }
    }

    public class RegisterUser10 : AppUser10
    {
        [Required]
        [DataType(DataType.Password)]
        [StringLength(20, MinimumLength = 8, ErrorMessage = "The password has to be between 8 to 20 characters long.")]
        public string Password { get; set; }

        [Compare("Password")]
        public string ComparePassword { get; set; }
    }

    public class LoginUser10
    {
        [Required]
        [StringLength(20, MinimumLength = 4, ErrorMessage = "The length of the username has to be between 4 to  20 characters long")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(20, MinimumLength = 8, ErrorMessage = "The password has to be between 8 to 20 characters long.")]
        public string Password { get; set; }

        [Compare("Password")]
        public string ComparePassword { get; set; }
    }

    public class ChangePassword10
    {
        public string UserId { get; set; }

        public string UserToken { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(20, MinimumLength = 8, ErrorMessage = "The password has to be between 8 to 20 characters long.")]
        public string OldPassword { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(20, MinimumLength = 8, ErrorMessage = "The password has to be between 8 to 20 characters long.")]
        public string NewPassword { get; set; }

        [Required]
        [Compare("NewPassword")]
        public string ComparePassword { get; set; }
    }
}
