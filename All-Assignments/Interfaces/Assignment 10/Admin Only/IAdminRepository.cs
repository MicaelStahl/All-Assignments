using All_Assignments.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace All_Assignments.Interfaces.Assignment_10.Admin
{
    /// <summary>
    /// A interface for admin only.
    /// </summary>
    public interface IAdminRepository
    {
        #region Create
        Task<AdminResultVM> Create(RegisterAdminUser10 user);
        #endregion

        #region Find
        Task<AdminUserDetailsVM> GetUser(AdminVerificationForUserVM verificationVM);
        Task<AdminUsersDetailsVM> GetUsers(AdminVerificationVM verificationVM);
        #endregion

        #region Update
        Task<AdminUserDetailsVM> EditUser(AdminUserDetailsVM user);
        Task<AdminResultVM> ChangeUserPassword(AdminChangeUserPassword10 changePassword);

        // ToDo: Add a method to change users roles here later.
        #endregion

        #region Delete
        Task<AdminResultVM> DeleteUser(AdminVerificationForUserVM verificationVM);
        #endregion
    }
}
