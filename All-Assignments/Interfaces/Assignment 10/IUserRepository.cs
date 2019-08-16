using All_Assignments.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace All_Assignments.Interfaces.Assignment_10
{
    /// <summary>
    /// The Return variables are bound to change.
    /// </summary>
    public interface IUserRepository
    {
        // Create
        #region Create
        Task<ReturnedUserVM> Create(RegisterUser10 user);
        #endregion

        // Read
        #region Read
        Task<UserDetailsVM> FindUser(string id);
        Task<ReturnedUserVM> LogInUser(LoginUser10 user10);

        /// <summary>
        /// Change values on this one later to create a more verified LogOut.
        /// </summary>
        Task<LoggedOutUser> LogOutUser(string userId, string userToken);
        Task<List<UserDetailsVM>> AllUsers(string userId, string userToken);
        #endregion

        // Update
        #region Update
        Task<AppUser10> Edit(AppUser10 user);

        Task<bool> ChangePassword(ChangePassword10 changePassword);
        #endregion

        // Delete
        #region Delete
        Task<bool> DeleteUser(string id);
        #endregion
    }
}
