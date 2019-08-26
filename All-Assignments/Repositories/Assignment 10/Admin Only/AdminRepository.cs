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
        public async Task<AdminUserDetailsVM> Create(RegisterAdminUser10 user)
        {
            try
            {
                var admin = await _userManager.FindByIdAsync(user.AdminId);

                if (admin == null)
                {
                    throw new Exception("Could not find the active user.");
                }

                var adminResult = await _userManager.VerifyUserTokenAsync(admin, "Default", "authentication-backend", user.AdminToken);

                if (!adminResult)
                {
                    throw new Exception("Could not verify the active user.");
                }

                if (_userManager.FindByNameAsync(user.UserName).Result != null)
                {
                    throw new Exception("This username is already in use.");
                }

                if (user.Password != user.ComparePassword)
                {
                    throw new Exception("The passwords does not match.");
                }

                var appUser = new AppUser10
                {
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Age = user.Age,
                    Email = user.Email,
                    SecurityStamp = user.SecurityStamp,
                    IsAdmin = user.IsAdmin
                };

                var result = await _userManager.CreateAsync(appUser, user.Password);

                if (result.Succeeded)
                {
                    var roles = await _roleManager.Roles.ToListAsync();

                    List<string> roleNames = new List<string>();

                    // This is here because I didn't know how else to only get the name of the roles to use in AddToRolesAsync.
                    roles.ForEach(x => roleNames.Add(x.Name));

                    var newUser = await _userManager.FindByNameAsync(user.UserName);

                    // This checks if the Admin boolean is true, if it is, it adds the user to all roles. otherwise only to NormalUser.
                    _ = user.IsAdmin == true ? await _userManager.AddToRolesAsync(newUser, roleNames)
                        : await _userManager.AddToRoleAsync(newUser, "NormalUser");


                    AdminUserDetailsVM userVM = new AdminUserDetailsVM
                    {
                        AdminId = admin.Id,
                        FrontEndToken = VerificationToken(),
                        AdminToken = await UserToken(admin),
                        User = new DetailsVM
                        {
                            UserId = newUser.Id,
                            UserName = newUser.UserName,
                            FirstName = newUser.FirstName,
                            LastName = newUser.LastName,
                            Age = newUser.Age,
                            Email = newUser.Email,
                            Roles = new List<string>(roleNames),
                            IsAdmin = newUser.IsAdmin
                        }
                    };

                    return userVM;
                }
                else
                { // Unsure if I'll keep this.
                    throw new Exception(result.Errors.ToString());
                }

            }
            catch (Exception ex)
            { // Doing this for a more versatile error-handling, and to not send down unnecessary information if something fails.
                AdminUserDetailsVM userVM = new AdminUserDetailsVM
                {
                    ErrorMessage = ex.Message
                };

                return userVM;
            }
        }
        #endregion

        #region Read
        public async Task<AdminUserDetailsVM> GetUser(AdminVerificationForUserVM verificationVM)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(verificationVM.AdminId) ||
                    string.IsNullOrWhiteSpace(verificationVM.UserId) ||
                    string.IsNullOrWhiteSpace(verificationVM.AdminToken))
                {
                    throw new Exception("Something went wrong.");
                }

                var admin = await _userManager.FindByIdAsync(verificationVM.AdminId);

                if (admin == null)
                {
                    throw new Exception("Cannot verify user.");
                }

                var adminResult = await _userManager.VerifyUserTokenAsync(admin, "Default", "authentication-backend", verificationVM.AdminToken);

                if (!adminResult)
                {
                    throw new Exception("Could not verify the administrator.");
                }

                var user = await _userManager.FindByIdAsync(verificationVM.UserId);

                if (user == null)
                {
                    throw new Exception("User could not be found.");
                }

                // Doing it this way because for some reason it throws an exception if they are combined.
                DetailsVM User = new DetailsVM
                {
                    UserId = user.Id,
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Age = user.Age,
                    Email = user.Email,
                    IsAdmin = user.IsAdmin,
                    Roles = await _userManager.GetRolesAsync(user),
                };

                AdminUserDetailsVM userVM = new AdminUserDetailsVM
                {
                    AdminId = admin.Id,
                    User = User,
                    FrontEndToken = VerificationToken(),
                    AdminToken = await UserToken(admin),
                    
                };

                //var roleNames = await _userManager.GetRolesAsync(user);

                //foreach (var item in roleNames)
                //{
                //    userVM.User.Roles.Add(item);
                //}


                return userVM;
            }
            catch (Exception ex)
            {
                AdminUserDetailsVM userVM = new AdminUserDetailsVM
                {
                    ErrorMessage = ex.Message
                };

                return userVM;
            }
        }

        public async Task<AdminUsersDetailsVM> GetUsers(AdminVerificationVM verificationVM)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(verificationVM.AdminId) || string.IsNullOrWhiteSpace(verificationVM.AdminToken))
                {
                    throw new Exception("Something went wrong.");
                }

                var admin = await _userManager.FindByIdAsync(verificationVM.AdminId);

                if (admin == null)
                {
                    throw new Exception("Cannot verify user.");
                }

                var adminResult = await _userManager.VerifyUserTokenAsync(admin, "Default", "authentication-backend", verificationVM.AdminToken);

                if (!adminResult)
                {
                    throw new Exception("Could not verify the administrator.");
                }

                var users = await _userManager.Users.ToListAsync();

                if (users == null || users.Count == 0)
                {
                    throw new Exception("No users could be found.");
                }

                AdminUsersDetailsVM usersVM = new AdminUsersDetailsVM
                {
                    AdminId = admin.Id,
                    FrontEndToken = VerificationToken(),
                    AdminToken = await UserToken(admin),
                    Users = new List<DetailsVM>()
                };

                foreach (var item in users)
                {
                    DetailsVM user = new DetailsVM
                    {
                        UserId = item.Id,
                        UserName = item.UserName,
                        FirstName = item.FirstName,
                        LastName = item.LastName,
                        Age = item.Age,
                        Email = item.Email,
                        Roles = await _userManager.GetRolesAsync(item)
                    };

                    if (user == null)
                    {
                        throw new Exception("One or more users were invalid.");
                    }

                    usersVM.Users.Add(user);
                }
                return usersVM;
            }
            catch (Exception ex)
            {
                AdminUsersDetailsVM user = new AdminUsersDetailsVM
                {
                    ErrorMessage = ex.Message
                };

                return user;

            }
        }
        #endregion

        #region Update
        public async Task<AdminUserDetailsVM> EditUser(AdminEditUserVM user)
        {
            try
            {
                var admin = await _userManager.FindByIdAsync(user.AdminId);

                if (admin == null)
                {
                    throw new Exception("Cannot find the active user.");
                }

                var adminResult = await _userManager.VerifyUserTokenAsync(admin, "Default", "authentication-backend", user.AdminToken);

                if (!adminResult)
                {
                    throw new Exception("Cannot verify the active user.");
                }

                var original = await _userManager.FindByIdAsync(user.User.UserId);

                if (original == null)
                {
                    throw new Exception("User does not exist in database.");
                }

                original.UserName = user.User.UserName;
                original.FirstName = user.User.FirstName;
                original.LastName = user.User.LastName;
                original.Age = user.User.Age;
                original.Email = user.User.Email;

                // This big text of chaos represents a if - else if format, 
                // which checks whether the IsAdmin value was changed, and if it was, changes the users role correctly.

                _ = user.User.IsAdmin != original.IsAdmin && user.User.IsAdmin == true
                    ? await _userManager.AddToRoleAsync(original, "Administrator")
                    : user.User.IsAdmin != original.IsAdmin && user.User.IsAdmin == false
                    ? await _userManager.RemoveFromRoleAsync(original, "Administrator") : null;

                original.IsAdmin = user.User.IsAdmin;

                // // This code right here does exactly the same thing as the code above.

                //if (user.User.IsAdmin != original.IsAdmin && user.User.IsAdmin == true)
                //{
                //    await _userManager.AddToRoleAsync(original, "Administrator");
                //}
                //else if (user.User.IsAdmin != original.IsAdmin && user.User.IsAdmin == false)
                //{
                //    await _userManager.RemoveFromRoleAsync(original, "Administrator");
                //}

                var result = await _userManager.UpdateAsync(original);

                if (result.Succeeded)
                {
                    AdminUserDetailsVM resultVM = new AdminUserDetailsVM
                    {
                        AdminId = admin.Id,
                        User = user.User,
                        FrontEndToken = VerificationToken(),
                        AdminToken = await UserToken(admin)
                    };

                    return resultVM;
                }
                else
                {
                    throw new Exception(result.Errors.ToString());
                }

            }
            catch (Exception ex)
            {
                AdminUserDetailsVM resultVM = new AdminUserDetailsVM
                {
                    ErrorMessage = ex.Message
                };

                return resultVM;
            }
        }

        public async Task<AdminResultVM> ChangeUserPassword(AdminChangeUserPassword10 changePassword)
        {
            try
            {
                if (
                    string.IsNullOrWhiteSpace(changePassword.OldPassword) || string.IsNullOrWhiteSpace(changePassword.NewPassword) ||
                    string.IsNullOrWhiteSpace(changePassword.ComparePassword))
                {
                    throw new Exception("One or more fields were empty.");
                }

                if (changePassword.NewPassword != changePassword.ComparePassword)
                {
                    throw new Exception("Passwords does not match");
                }

                if (string.IsNullOrWhiteSpace(changePassword.UserToken) || string.IsNullOrWhiteSpace(changePassword.UserId) ||
                    string.IsNullOrWhiteSpace(changePassword.AdminId) || string.IsNullOrWhiteSpace(changePassword.AdminToken))
                {
                    throw new Exception("Something went wrong.");
                }

                var admin = await _userManager.FindByIdAsync(changePassword.AdminId);

                if (admin == null)
                {
                    throw new Exception("Cannot find active user.");
                }

                var adminResult = await _userManager.VerifyUserTokenAsync(admin, "Default", "authentication-backend", changePassword.AdminToken);

                if (!adminResult)
                {
                    throw new Exception("Cannot verify active user.");
                }

                var user = await _userManager.FindByIdAsync(changePassword.UserId);

                if (user == null)
                {
                    throw new Exception("User could not be found.");
                }

                var result = await _userManager.ChangePasswordAsync(user, changePassword.OldPassword, changePassword.NewPassword);

                if (result.Succeeded)
                {

                    return new AdminResultVM()
                    {
                        AdminId = admin.Id,
                        Success = "Password was successfully updated!",
                        FrontEndToken = VerificationToken(),
                        AdminToken = await UserToken(admin),
                    };
                }
                else
                {
                    throw new Exception(result.Errors.ToString());
                }

            }
            catch (Exception ex)
            {
                return new AdminResultVM() { Failed = ex.Message };
            }

        }
        #endregion

        #region Delete
        public async Task<AdminResultVM> DeleteUser(AdminVerificationForUserVM verificationVM)
        {
            AdminResultVM resultVM = new AdminResultVM();
            try
            {
                if (string.IsNullOrWhiteSpace(verificationVM.AdminId) || 
                    string.IsNullOrWhiteSpace(verificationVM.UserId) || 
                    string.IsNullOrWhiteSpace(verificationVM.AdminToken))
                {
                    throw new Exception("Something went wrong.");
                }

                var admin = await _userManager.FindByIdAsync(verificationVM.AdminId);

                if (admin == null)
                {
                    throw new Exception("Cannot verify user.");
                }

                var adminResult = await _userManager.VerifyUserTokenAsync(admin, "Default", "authentication-backend", verificationVM.AdminToken);

                if (!adminResult)
                {
                    throw new Exception("Could not verify the administrator.");
                }

                var user = await _userManager.FindByIdAsync(verificationVM.UserId);

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
        /// <summary>
        /// Used for general token-generation for verification from front-end to back-end
        /// </summary>
        private string VerificationToken()
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Secret-key-frontend"));
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                issuer: "http://localhost:3000",
                audience: "http://localhost:3000",
                claims: new List<Claim>(),
                // Change this timer later to 15 min (Standard). It's 60 min atm for developing purposes.
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: signingCredentials
                );

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        /// <summary>
        /// Used for general token-generation for verification on the back-end. 
        /// </summary>
        private async Task<string> UserToken(AppUser10 user)
        {
            return await _userManager.GenerateUserTokenAsync(user, "Default", "authentication-backend");
        }
        #endregion
    }
}
