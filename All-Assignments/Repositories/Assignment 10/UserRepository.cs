using All_Assignments.Interfaces.Assignment_10;
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

namespace All_Assignments.Repositories.Assignment_10
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<AppUser10> _userManager;
        private readonly SignInManager<AppUser10> _signInManager;

        public UserRepository(SignInManager<AppUser10> signInManager, UserManager<AppUser10> userManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        #region Create

        public async Task<ResultVM> Create(RegisterUser10 user)
        {
            try
            {
                if (_userManager.FindByNameAsync(user.UserName).Result != null)
                {
                    throw new Exception("The requested username already exists.");
                }

                if (user.Password != user.ComparePassword)
                {
                    throw new Exception("The passwords does not match");
                }


                var result = await _userManager.CreateAsync(user, user.Password);

                if (result.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(user, "NormalUser");

                    if (!roleResult.Succeeded)
                    {
                        throw new Exception("Something went wrong.");
                    }

                    return new ResultVM() { Success = "User was successfully created! \nYou can now sign in." };
                }
                else
                {
                    throw new Exception("The user could not be created.");
                }
            }
            catch (Exception ex)
            {
                return new ResultVM() { Failed = ex.Message };
            }
        }
        #endregion

        #region Read

        /// <summary>
        /// Used for, for example checking details on user or when you want to update the information.
        /// </summary>
        public async Task<UserDetailsVM> FindUser(string userId, string userToken)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(userToken))
                {
                    throw new Exception("Something went wrong. Please try again");
                }

                var user = await _userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    throw new Exception("The requested user could not be found.");
                }

                var result = await _userManager.VerifyUserTokenAsync(user, "Default", "authentication-backend", userToken);

                if (!result)
                {
                    throw new Exception("Cannot verify user.");
                }
                UserDetailsVM userDetails = new UserDetailsVM
                {
                    UserId = user.Id,
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Age = user.Age,
                    Email = user.Email,
                    IsAdmin = user.IsAdmin,
                    VerificationToken = VerificationToken(),
                    Roles = await _userManager.GetRolesAsync(user),
                    UserToken = await UserToken(user)
                };

                return userDetails;
            }
            catch (Exception ex)
            {
                UserDetailsVM userDetails = new UserDetailsVM
                {
                    ErrorMessage = ex.Message
                };

                return userDetails;
            }
        }

        /// <summary>
        /// Only for Admin.
        /// </summary>
        public async Task<List<UserDetailsVM>> AllUsers(string userId, string userToken)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    throw new Exception("The current user could not be verified. Please try again.");
                }

                var result = await _userManager.VerifyUserTokenAsync(user, "Default", "authentication-backend", userToken);

                if (!result)
                {
                    throw new Exception("User could not be verified.");
                }

                // make a check if user is in correct roles. Or is that needed?

                var users = await _userManager.Users.ToListAsync();

                if (users == null)
                {
                    throw new Exception("Something went wrong. Please try again.");
                }

                List<UserDetailsVM> usersVM = new List<UserDetailsVM>();

                foreach (var item in users)
                {
                    UserDetailsVM userVM = new UserDetailsVM
                    {
                        UserId = item.Id,
                        UserName = item.UserName,
                        FirstName = item.FirstName,
                        LastName = item.LastName,
                        Age = item.Age,
                        Email = item.Email,
                        UserToken = item.UserToken,
                    };
                    usersVM.Add(userVM);
                }
                return usersVM;
            }
            catch
            {
                throw null;
            }
        }

        #endregion

        #region Signin/Signout

        public async Task<ReturnedUserVM> LogInUser(LoginUser10 user10)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(user10.Password) || string.IsNullOrWhiteSpace(user10.UserName))
                {
                    throw new Exception("Username or password was incorrect.");
                }

                var user = await _userManager.FindByNameAsync(user10.UserName);

                if (user == null)
                {
                    throw new Exception("No user with the selected username exists.");
                }

                var result = await _signInManager.PasswordSignInAsync(user.UserName, user10.Password, false, false);

                if (result.Succeeded)
                {
                    ReturnedUserVM returnedUser = new ReturnedUserVM
                    {
                        UserId = user.Id,

                        FrontEndToken = VerificationToken(),

                        UserToken = await _userManager.GenerateUserTokenAsync(user, "Default", "authentication-backend"),

                        Roles = await _userManager.GetRolesAsync(user)
                    };

                    return returnedUser;
                }
                else if (result.IsLockedOut)
                {
                    throw new Exception("User is locked out. Please try again later.");
                }
                else
                {
                    throw new Exception("Username or password was incorrect.");
                }
            }
            catch (Exception ex)
            {
                ReturnedUserVM returnedUser = new ReturnedUserVM
                {
                    ErrorMessage = ex.Message
                };
                return returnedUser;
            }

        }

        public async Task<ResultVM> LogOutUser(string userId, string userToken)
        {
            try
            {
                // This code is for whenever I make a mistake can't sign out the user.
                //await _signInManager.SignOutAsync();
                //ResultVM userV = new ResultVM
                //{
                //    Success = "User was successfully signed out."
                //};

                //return userV;

                if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(userToken))
                {
                    throw new Exception("Something went wrong. Please try again.");
                }

                var user = await _userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    throw new Exception("User could not be found. Please try again or contact administration if this problem persists.");
                }

                var result = await _userManager.VerifyUserTokenAsync(user, "Default", "authentication-backend", userToken);

                if (true)
                {
                    await _signInManager.SignOutAsync();
                    ResultVM userVM = new ResultVM
                    {
                        Success = "User was successfully signed out."
                    };

                    return userVM;
                }
                else
                {
                    throw new Exception("User could not be verified. Is it really you?");
                }

            }
            catch (Exception ex)
            {
                ResultVM userVM = new ResultVM
                {
                    Failed = ex.Message
                };
                return userVM;
            }
        }

        #endregion

        #region Update
        public async Task<UserDetailsVM> Edit(UserDetailsVM user)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(user.UserId) || string.IsNullOrWhiteSpace(user.UserToken))
                {
                    throw new Exception("Something went wrong.");
                }
                if (string.IsNullOrWhiteSpace(user.UserName) || string.IsNullOrWhiteSpace(user.FirstName) ||
                    string.IsNullOrWhiteSpace(user.LastName) || string.IsNullOrWhiteSpace(user.Email) ||
                    user.Age < 18 || user.Age > 110)
                {
                    throw new Exception("Not all fields were filled correctly.");
                }

                var original = await _userManager.FindByIdAsync(user.UserId);

                if (original == null)
                {
                    throw new Exception("Cannot find the active user.");
                }

                var originalResult = await _userManager.VerifyUserTokenAsync(original, "Default", "authentication-backend", user.UserToken);

                if (!originalResult)
                {
                    throw new Exception("Cannot verify the active user");
                }

                original.UserName = user.UserName;
                original.FirstName = user.FirstName;
                original.LastName = user.LastName;
                original.Age = user.Age;
                original.Email = user.Email;

                var result = await _userManager.UpdateAsync(original);

                if (result.Succeeded)
                {
                    return new UserDetailsVM()
                    {
                        UserId = user.UserId,
                        UserName = user.UserName,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Age = user.Age,
                        Email = user.Email,
                        VerificationToken = VerificationToken(),

                        UserToken = await UserToken(original),
                        Roles = await _userManager.GetRolesAsync(original)
                    };
                }
                else
                {
                    throw new Exception("Something went wrong.");
                }
            }
            catch (Exception ex)
            {
                return new UserDetailsVM() { ErrorMessage = ex.Message };
                throw;
            }
        }

        public async Task<UserFrontUpdateVM> ChangePassword(ChangePassword10 changePassword)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(changePassword.NewPassword) ||
                    string.IsNullOrWhiteSpace(changePassword.OldPassword) ||
                    string.IsNullOrWhiteSpace(changePassword.ComparePassword))
                {
                    throw new Exception("One or more fields were empty.");
                }

                if (string.IsNullOrWhiteSpace(changePassword.UserId) || string.IsNullOrWhiteSpace(changePassword.UserToken))
                {
                    throw new Exception("Something went wrong.");
                }

                if (changePassword.NewPassword == changePassword.OldPassword)
                {
                    throw new Exception("The old password cannot be the same as the new one.");
                }
                else if (changePassword.NewPassword != changePassword.ComparePassword)
                {
                    throw new Exception("The passwords do not match.");
                }

                var user = await _userManager.FindByIdAsync(changePassword.UserId);

                if (user == null)
                {
                    throw new Exception("Cannot find the active user");
                }

                var userResult = await _userManager.VerifyUserTokenAsync(user, "Default", "authentication-backend", changePassword.UserToken);

                if (!userResult)
                {
                    throw new Exception("Cannot verify the active user.");
                }

                var result = await _userManager.ChangePasswordAsync(user, changePassword.OldPassword, changePassword.NewPassword);

                if (result.Succeeded)
                {
                    return new UserFrontUpdateVM()
                    {
                        UserId = user.Id,
                        Success = "The password was successfully changed.",
                        FrontEndToken = VerificationToken(),
                        UserToken = await UserToken(user)
                    };
                }
                else
                {
                    throw new Exception("Incorrect password. Please try again.");
                }
            }
            catch (Exception ex)
            {

                return new UserFrontUpdateVM() { Failed = ex.Message };
            }

        }
        #endregion

        #region Delete
        public async Task<ResultVM> DeleteUser(DeleteUserVM userVM)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(userVM.UserId) || string.IsNullOrWhiteSpace(userVM.UserToken))
                {
                    throw new Exception("Something went wrong.");
                }

                var user = await _userManager.FindByIdAsync(userVM.UserId);

                if (user == null)
                {
                    throw new Exception("Cannot find the active user.");
                }

                var userResult = await _userManager.VerifyUserTokenAsync(user, "Default", "authentication-backend", userVM.UserToken);

                if (!userResult)
                {
                    throw new Exception("Cannot verify the active user");
                }

                var result = await _userManager.DeleteAsync(user);

                if (result.Succeeded)
                {
                    return new ResultVM() { Success = "User was successfully deleted." };
                }
                else
                {
                    throw new Exception("Something went wrong!");
                }
            }
            catch (Exception ex)
            {
                return new ResultVM() { Failed = ex.Message };
            }
        }
        #endregion

        #region TokenGeneration
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

        // I shouldn't ever need this one either for the same reason as above.
        private async Task<string> UserToken(AppUser10 user)
        {
            return await _userManager.GenerateUserTokenAsync(user, "Default", "authentication-backend");
        }
        #endregion

        // Not used.
        #region TokenCreation - Created in courtesy of https://bit.ly/31FTeUp

        /// <summary>
        /// Might not use it. But it's there just in case.
        /// </summary>
        //private string TokenCreation(AppUser10 user)
        //{
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var key = Encoding.ASCII.GetBytes(_tokenManagement.Secret);
        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = new ClaimsIdentity(new Claim[]
        //        {
        //                    new Claim(ClaimTypes.Name, user.Id)
        //        }),
        //        Expires = DateTime.UtcNow.AddDays(7),
        //        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
        //    };
        //    var token = tokenHandler.CreateToken(tokenDescriptor);
        //    return tokenHandler.WriteToken(token);
        //}

        #endregion  
    }
}
