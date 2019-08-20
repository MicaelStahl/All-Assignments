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

    public class RegisterAdminUser10 : RegisterUser10
    {
        public bool Admin { get; set; }
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
    }

    /// <summary>
    /// A ViewModel that gets sent down and up with requests to verify the correct user is requesting information.
    /// </summary>
    public class ReturnedUserVM
    {
        public string UserId { get; set; }

        public string UserToken { get; set; }

        public string TokenToken { get; set; }

        public string ErrorMessage { get; set; }
    }

    public class ResultVM
    {
        public string Success{ get; set; }

        public string Failed { get; set; }
    }

    /// <summary>
    /// A ViewModel that gets sent down to the front-end when the user wants to view his/her data.
    /// </summary>
    public class UserDetailsVM
    {
        public string UserId { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int Age { get; set; }

        public string Email { get; set; }

        /// <summary>
        /// The token to verify the user. Supposed to refresh every time the user makes a call to the back-end.
        /// </summary>
        public string UserToken { get; set; }


        /// <summary>
        /// The key between the connection between back-end and front-end. refreshes after every call to the backend.
        /// </summary>
        public string VerificationToken { get; set; }

        /// <summary>
        /// Only used when something went wrong in back-end. There to give the user some information.
        /// </summary>
        public string ErrorMessage { get; set; }
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
