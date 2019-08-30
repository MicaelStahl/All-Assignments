using All_Assignments.ViewModels;
using System.Threading.Tasks;

namespace All_Assignments.Interfaces.Assignment_10.Admin
{
    /// <summary>
    /// A interface for admin only.
    /// </summary>
    public interface IAdminRepository
    {
        #region Create
        Task<AdminUserDetailsVM> Create(RegisterAdminUser10 user);
        #endregion

        #region Find
        Task<AdminUserDetailsVM> GetUser(AdminVerificationForUserVM verificationVM);
        Task<AdminUsersDetailsVM> GetUsers(AdminVerificationVM verificationVM);
        #endregion

        #region Update
        Task<AdminUserDetailsVM> EditUser(AdminEditUserVM user);
        Task<AdminResultVM> ChangeUserPassword(AdminChangeUserPassword10 changePassword);
        #endregion

        #region Delete
        Task<AdminResultVM> DeleteUser(AdminVerificationForUserVM verificationVM);
        #endregion
    }
}
