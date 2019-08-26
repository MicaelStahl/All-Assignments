using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace All_Assignments.ViewModels
{
    // ------------------------------ Users ViewModels ------------------------------ \\

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

        public bool IsAdmin { get; set; }
    }

    /// <summary>
    /// Inherits AppUser10, which is the baseline User for this application, but adds password and comparePassword as a register.
    /// </summary>
    public class RegisterUser10 : AppUser10
    {
        [Required]
        [DataType(DataType.Password)]
        [StringLength(20, MinimumLength = 8, ErrorMessage = "The password has to be between 8 to 20 characters long.")]
        public string Password { get; set; }

        [Compare("Password")]
        public string ComparePassword { get; set; }
    }

    /// <summary>
    /// The main ViewModel for Logging in for regular users.
    /// </summary>
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

        public string FrontEndToken { get; set; }

        public IList<string> Roles { get; set; }

        public string ErrorMessage { get; set; }
    }

    /// <summary>
    /// A simple ViewModel used to tell the user if the action was successful, or if it somehow failed.
    /// Provides just enough information to the user to understand the problem.
    /// </summary>
    public class ResultVM
    {
        public string Success { get; set; }

        public string Failed { get; set; }
    }

    /// <summary>
    /// A ViewModel that contains the basic information about a user. Used for regular users and to inherit for admin.
    /// </summary>
    public class DetailsVM
    {
        public string UserId { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int Age { get; set; }

        public string Email { get; set; }

        /// <summary>
        /// Signals whether the chosen user is an admin or not.
        /// </summary>
        public bool IsAdmin { get; set; }

        public IList<string> Roles { get; set; }

        /// <summary>
        /// Only used when something went wrong in back-end. There to give the user some information.
        /// </summary>
        public string ErrorMessage { get; set; }
    }

    /// <summary>
    /// A ViewModel that gets sent down to the front-end when the user wants to view his/her data.
    /// Inherits the DetailsVM ViewModel which shows basic information of a user.
    /// </summary>
    public class UserDetailsVM : DetailsVM
    {
        /// <summary>
        /// The token to verify the user. Supposed to refresh every time the user makes a call to the back-end.
        /// </summary>
        public string UserToken { get; set; }

        /// <summary>
        /// The key between the connection between back-end and front-end. refreshes after every call to the backend.
        /// </summary>
        public string VerificationToken { get; set; }

    }

    /// <summary>
    /// A ViewModel that gets sent to the front-end after successful actions that updates the tokens.
    /// </summary>
    public class UserFrontUpdateVM
    {
        public string UserId { get; set; }

        public string FrontEndToken { get; set; }

        public string UserToken { get; set; }

        public string Failed { get; set; }

        public string Success { get; set; }
    }

    /// <summary>
    /// The main ViewModel for users to change password.
    /// </summary>
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

    // ------------------------------ Admin ViewModels ------------------------------ \\

    public class AdminEditUserVM : IAdminVerification
    {
        public DetailsVM User { get; set; }

        public string AdminId { get; set; }
        public string AdminToken { get; set; }
        public string FrontEndToken { get; set; }
    }

    /// <summary>
    /// ViewModel to get the specificed user with Admin verification.
    /// </summary>
    public class AdminUserDetailsVM : IAdminVerification
    {
        public DetailsVM User { get; set; }

        public string AdminId { get; set; }

        public string AdminToken { get; set; }

        public string FrontEndToken { get; set; }

        public string ErrorMessage { get; set; }
    }

    /// <summary>
    /// ViewModel to get a list of users with Admin verification.
    /// </summary>
    public class AdminUsersDetailsVM : IAdminVerification
    {
        public List<DetailsVM> Users { get; set; }

        public string AdminId { get; set; }

        public string AdminToken { get; set; }

        public string FrontEndToken { get; set; }

        public string ErrorMessage { get; set; }
    }

    /// <summary>
    /// A ViewModel for admin to change passwords with administrator verification.
    /// </summary>
    public class AdminChangeUserPassword10 : ChangePassword10, IAdminVerification
    {
        public string AdminId { get; set; }

        public string AdminToken { get; set; }

        public string FrontEndToken { get; set; }
    }

    /// <summary>
    /// A interface for the admin verification in the admin-repository.
    /// </summary>
    public interface IAdminVerification
    {
        [Required]
        string AdminId { get; set; }

        [Required]
        string AdminToken { get; set; }

        [Required]
        string FrontEndToken { get; set; }
    }

    /// <summary>
    /// This ViewModel indicates if the task was successful or failed with administrator verification.
    /// </summary>
    public class AdminResultVM : ResultVM, IAdminVerification
    {
        public string AdminId { get; set; }

        public string AdminToken { get; set; }

        public string FrontEndToken { get; set; }
    }

    /// <summary>
    /// This ViewModel is used when admin wants all users. it verifies that the user is indeed the administrator.
    /// </summary>
    public class AdminVerificationVM : IAdminVerification
    {
        public string AdminId { get; set; }

        public string AdminToken { get; set; }

        public string FrontEndToken { get; set; }
    }

    /// <summary>
    /// This ViewModel is used when admin wants to find a user. (This is for finding user or delete.)
    /// </summary>
    public class AdminVerificationForUserVM : AdminVerificationVM
    {
        public string UserId { get; set; }
    }

    /// <summary>
    /// Just like the normal register it inherits (RegisterUser10), except with a Admin bool, 
    /// which verifies if the user will be in Administrator role or not.
    /// </summary>
    public class RegisterAdminUser10 : RegisterUser10, IAdminVerification
    {
        public string AdminId { get; set; }

        public string AdminToken { get; set; }

        public string FrontEndToken { get; set; }
    }

}
