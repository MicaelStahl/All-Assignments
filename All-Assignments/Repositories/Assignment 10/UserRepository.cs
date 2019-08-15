using All_Assignments.Interfaces.Assignment_10;
using All_Assignments.Models.Token;
using All_Assignments.ViewModels;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
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
        //private readonly DataProtectorTokenProvider<AppUser10> provider;
        //private readonly IDataProtectionProvider _protection;
        //private readonly IOptions<DataProtectionTokenProviderOptions> _options;

        private readonly UserManager<AppUser10> _userManager;
        private readonly SignInManager<AppUser10> _signInManager;

        /// <summary>
        /// For token generation on successful login.
        /// </summary>
        //private readonly TokenManagement _tokenManagement;
        //IOptions<TokenManagement> tokenManagement,
        //_tokenManagement = tokenManagement.Value;

        public UserRepository(
                              // IOptions<DataProtectionTokenProviderOptions> options,
                              // IDataProtectionProvider protection,
                              SignInManager<AppUser10> signInManager,
                              UserManager<AppUser10> userManager)
        {
            //_protection = protection;
            //_options = options;
            //provider = new DataProtectorTokenProvider<AppUser10>(_protection, _options);
            _userManager = userManager;
            _signInManager = signInManager;
        }

        #region Create
        /// <summary>
        /// Also Referred as Register in coding world.
        /// </summary>
        public async Task<ReturnedUserVM> Create(RegisterUser10 user)
        {
            ReturnedUserVM userVM = new ReturnedUserVM();

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

                // Potentially create a method that will handle all validations for username, firstname etc.?

                user.UserToken = await _userManager.GenerateUserTokenAsync(user, TokenOptions.DefaultAuthenticatorProvider, "Authentication");

                var result = await _userManager.CreateAsync(user, user.Password);

                var createdUser = await _userManager.FindByNameAsync(user.UserName);

                userVM.UserId = createdUser.Id;
                userVM.UserToken = createdUser.UserToken;

                if (result.Succeeded)
                {
                    return userVM;
                }
                else
                {
                    throw new Exception("The user could not be created.");
                }
            }
            catch (Exception ex)
            {
                userVM.ErrorMessage = ex.Message;
                return userVM;
            }
        }
        #endregion

        #region Read
        /// <summary>
        /// Used for, for example checking details on user or when you want to update the information.
        /// </summary>
        public async Task<UserDetailsVM> FindUser(string id)
        {
            UserDetailsVM userDetails = new UserDetailsVM();

            try
            {
                if (string.IsNullOrWhiteSpace(id))
                {
                    throw new Exception("Something went wrong. Please try again");
                }

                var user = await _userManager.FindByIdAsync(id);

                if (user == null)
                {
                    throw new Exception("The requested user could not be found.");
                }

                userDetails.UserId = user.Id;
                userDetails.UserName = user.UserName;
                userDetails.FirstName = user.FirstName;
                userDetails.LastName = user.LastName;
                userDetails.Age = user.Age;
                userDetails.Email = user.Email;
                userDetails.UserToken = user.UserToken;

                //// Might use this later.
                //userDetails.UserToken = TokenCreation(user);

                return userDetails;
            }
            catch (Exception ex)
            {
                userDetails.ErrorMessage = ex.Message;

                return userDetails;
            }
        }

        public async Task<List<UserDetailsVM>> AllUsers()
        {
            try
            {
                var users = await _userManager.Users.ToListAsync();

                if (users == null)
                {
                    throw new Exception("Something went wrong. Please try again.");
                }

                List<UserDetailsVM> usersVM = new List<UserDetailsVM>();

                foreach (var item in users)
                {
                    UserDetailsVM user = new UserDetailsVM
                    {
                        UserId = item.Id,
                        UserName = item.UserName,
                        FirstName = item.FirstName,
                        LastName = item.LastName,
                        Age = item.Age,
                        Email = item.Email,
                        UserToken = item.UserToken,
                    };
                    usersVM.Add(user);
                }
                return usersVM;
            }
            catch
            {
                throw null;
            }
        }

        public async Task<ReturnedUserVM> LogInUser(LoginUser10 user10)
        {
            ReturnedUserVM returnedUser = new ReturnedUserVM();

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
                    //returnedUser.UserToken = TokenCreation(user);
                    // "No IUserTwoFactorTokenProvider<TUser> named 'DataProtectorTokenProvider' is registered."

                    //"CfDJ8FTAQOjt/fJNkxXzKP6xPJCmW5G+qLPlt0AkCYzQETOMZ7Ev/WTs/lIa2xIDNvqe+DmM2o/RrQ088WxwvXKO9LWN2X3 
                    // cfICgoTSAOmD /z3/2m6rVvZ6RjWxCI41rqqn5Qt+Xz37RXBFjQz1wU6wUFSyixNb9ejfxKDhVAcsbAthrA9D7xdX2D/
                    // JQatrclIlSb7fUqPVW +5Yy/XpYloaX/NF3I0Fl+Y0/x+yAls9y6I1iBGLhWhkXN8kdjwTuzII6TQ=="
                    TokenOptions newProvider = new TokenOptions();

                    returnedUser.UserId = user.Id;
                    returnedUser.UserToken = await _userManager.GenerateUserTokenAsync(user, "Default", "authentication-frontend");
                    //returnedUser.UserToken = await _userManager.GenerateUserTokenAsync(user, "Authentication", "authentication-frontend");

                    return returnedUser;
                }
                else if (result.IsLockedOut)
                {
                    throw new Exception("User is locked out. Please try again later.");
                }
                else
                {
                    throw new Exception("Could not log in user. Please try again.");
                }
            }
            catch (Exception ex)
            {
                returnedUser.ErrorMessage = ex.Message;
                return returnedUser;
            }

        }

        public async Task LogOutUser(string userId, string userToken)
        {
            await _signInManager.SignOutAsync();
        }
        #endregion

        #region Update
        public async Task<AppUser10> Edit(AppUser10 user)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> ChangePassword(ChangePassword10 changePassword)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region Delete
        public async Task<bool> DeleteUser(string id)
        {
            throw new NotImplementedException();
        }
        #endregion

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
