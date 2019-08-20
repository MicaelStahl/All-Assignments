using All_Assignments.Database;
using All_Assignments.Interfaces.Assignment_10.Admin;
using All_Assignments.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace All_Assignments.Repositories.Assignment_10.Admin
{
    public class AdminRepository : IAdminRepository
    {
        private readonly UserManager<AppUser10> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AdminRepository(UserManager<AppUser10> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        #region Create
        public async Task<ResultVM> Create(RegisterAdminUser10 user)
        {
            ResultVM resultVM = new ResultVM();
            try
            {
                if (_userManager.FindByNameAsync(user.UserName).Result != null)
                {
                    throw new Exception("This username is already in use.");
                }

                if (user.Password != user.ComparePassword)
                {
                    throw new Exception("The passwords does not match.");
                }

                var result = await _userManager.CreateAsync(user, user.Password);

                if (result.Succeeded)
                {
                    var roles = await _roleManager.Roles.ToListAsync();

                    List<string> roleNames = new List<string>();

                    roles.ForEach(x => roleNames.Add(x.Name));

                    _ = user.Admin == true ? await _userManager.AddToRolesAsync(user, roleNames) 
                        : await _userManager.AddToRoleAsync(user, "NormalUser");

                    resultVM.Success = "User was successfully created!";

                    return resultVM;
                }
                else
                { // Unsure if I'll keep this.
                    throw new Exception(result.Errors.ToString());
                }

            }
            catch (Exception ex)
            { // Doing this for a more versatile error-handling, and to not send down unnecessary information if something fails.
                resultVM.Failed = ex.Message;

                return resultVM;
            }
        }
        #endregion

        #region Read
        public async Task<UserDetailsVM> GetUser(string userId)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(userId))
                {
                    throw new Exception("Something went wrong.");
                }

                var user = await _userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    throw new Exception("User could not be found.");
                }

                UserDetailsVM userVM = new UserDetailsVM
                {
                    UserId = user.Id,
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Age = user.Age,
                    Email = user.Email
                };

                return userVM;
            }
            catch (Exception ex)
            {
                UserDetailsVM userVM = new UserDetailsVM
                {
                    ErrorMessage = ex.Message
                };

                return userVM;
            }
        }

        public async Task<List<UserDetailsVM>> GetUsers()
        {
            List<UserDetailsVM> usersVM = new List<UserDetailsVM>();
            try
            {
                var users = await _userManager.Users.ToListAsync();

                if (users == null || users.Count == 0)
                {
                    throw new Exception("No users could be found.");
                }

                foreach (var item in users)
                {
                    UserDetailsVM user = new UserDetailsVM
                    {
                        UserId = item.Id,
                        UserName = item.UserName,
                        FirstName = item.FirstName,
                        LastName = item.LastName,
                        Age = item.Age,
                        Email = item.Email
                    };

                    if (user == null)
                    {
                        throw new Exception("One or more users were invalid.");
                    }

                    usersVM.Add(user);
                }
                return usersVM;
            }
            catch (Exception ex)
            {
                UserDetailsVM user = new UserDetailsVM
                {
                    ErrorMessage = ex.Message
                };

                // Clearing to only keep one user in here, which is a user with an errormessage.
                usersVM.Clear();

                usersVM.Add(user);

                return usersVM;

            }
        }
        #endregion

        #region Update
        public async Task<ResultVM> EditUser(UserDetailsVM user)
        {
            ResultVM resultVM = new ResultVM();

            try
            {
                var original = await _userManager.FindByIdAsync(user.UserId);

                if (original == null)
                {
                    throw new Exception("User does not exist in database.");
                }

                original.UserName = user.UserName;
                original.FirstName = user.FirstName;
                original.LastName = user.LastName;
                original.Age = user.Age;
                original.Email = user.Email;

                var result = await _userManager.UpdateAsync(original);

                if (result.Succeeded)
                {
                    resultVM.Success = "User was successfully edited!";

                    return resultVM;
                }
                else
                {
                    throw new Exception(result.Errors.ToString());
                }

            }
            catch (Exception ex)
            {
                resultVM.Failed = ex.Message;

                return resultVM;
            }
        }

        public async Task<ResultVM> ChangeUserPassword(ChangePassword10 changePassword)
        {
            ResultVM resultVM = new ResultVM();
            try
            {
                if (string.IsNullOrWhiteSpace(changePassword.OldPassword) || string.IsNullOrWhiteSpace(changePassword.NewPassword) ||
                    string.IsNullOrWhiteSpace(changePassword.ComparePassword))
                {
                    throw new Exception("One or more fields were empty.");
                }

                var user = await _userManager.FindByIdAsync(changePassword.UserId);

                if (user == null)
                {
                    throw new Exception("User could not be found.");
                }

                if (changePassword.NewPassword != changePassword.ComparePassword)
                {
                    throw new Exception("Passwords does not match");
                }

                var result = await _userManager.ChangePasswordAsync(user, changePassword.OldPassword, changePassword.NewPassword);

                if (result.Succeeded)
                {
                    resultVM.Success = "Password was successfully changed!";

                    return resultVM;
                }
                else
                {
                    throw new Exception(result.Errors.ToString());
                }

            }
            catch (Exception ex)
            {
                resultVM.Failed = ex.Message;

                return resultVM;
            }

        }
        #endregion

        #region Delete
        public async Task<ResultVM> DeleteUser(string userId)
        {
            ResultVM resultVM = new ResultVM();
            try
            {
                if (string.IsNullOrWhiteSpace(userId))
                {
                    throw new Exception("Something went wrong.");
                }

                var user = await _userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    throw new Exception("User could not be found.");
                }

                var result = await _userManager.DeleteAsync(user);

                if (result.Succeeded)
                {
                    resultVM.Success = "User was successfully removed";

                    return resultVM;
                }
                else
                {
                    throw new Exception(result.Errors.ToString());
                }

            }
            catch (Exception ex)
            {
                resultVM.Failed = ex.Message;

                return resultVM;
            }

        }
        #endregion

        #region TokenGeneration
        //// I should never need these ones since everything is handled by one account - the administrator.
        //private string VerificationToken()
        //{
        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Secret-key-frontend"));
        //    var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        //    var tokenOptions = new JwtSecurityToken(
        //        issuer: "http://localhost:3000",
        //        audience: "http://localhost:3000",
        //        claims: new List<Claim>(),
        //        expires: DateTime.Now.AddMinutes(15),
        //        signingCredentials: signingCredentials
        //        );

        //    return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        //}

        //// I shouldn't ever need this one either for the same reason as above.
        //private async Task<string> UserToken(AppUser10 user)
        //{
        //    return await _userManager.GenerateUserTokenAsync(user, "Default", "authentication-backend");
        //}
        #endregion
    }
}
