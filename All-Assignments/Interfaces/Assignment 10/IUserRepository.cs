﻿using All_Assignments.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace All_Assignments.Interfaces.Assignment_10
{
    /// <summary>
    /// A interface for the regular user. Return values are bound to change in the future.
    /// </summary>
    public interface IUserRepository
    {
        // Create
        #region Create
        Task<ResultVM> Create(RegisterUser10 user);
        #endregion

        // Read
        #region Read
        Task<UserDetailsVM> FindUser(string userId, string userToken);
        Task<ReturnedUserVM> LogInUser(LoginUser10 user10);

        /// <summary>
        /// Change values on this one later to create a more verified LogOut.
        /// </summary>
        Task<ResultVM> LogOutUser(string userId, string userToken);
        Task<List<UserDetailsVM>> AllUsers(string userId, string userToken);
        #endregion

        // Update
        #region Update
        Task<UserDetailsVM> Edit(UserDetailsVM user);

        Task<UserFrontUpdateVM> ChangePassword(ChangePassword10 changePassword);
        #endregion

        // Delete
        #region Delete
        Task<ResultVM> DeleteUser(DeleteUserVM userVM);
        #endregion
    }
}
