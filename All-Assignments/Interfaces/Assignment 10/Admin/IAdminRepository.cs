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
        Task<ResultVM> Create(RegisterUser10 user);
        #endregion

        #region Find
        Task<UserDetailsVM> GetUser(string userId);
        Task<List<UserDetailsVM>> GetUsers();
        #endregion

        #region Update
        Task<ResultVM> EditUser(UserDetailsVM user);
        Task<ResultVM> ChangeUserPassword(ChangePassword10 changePassword);
        #endregion

        #region Delete
        Task<ResultVM> DeleteUser(string userId);
        #endregion
    }
}
