﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using All_Assignments.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace All_Assignments.Controllers
{
    /// <summary>
    /// Edit this controller later to not send down more userdata than necessary.
    /// </summary>
    [Authorize]
    public class IdentityController : Controller
    {
        public readonly UserManager<AppUser10> _userManager;
        public readonly RoleManager<IdentityRole> _roleManager;
        public readonly SignInManager<AppUser10> _signInManager;

        public IdentityController(UserManager<AppUser10> userManager,
            RoleManager<IdentityRole> roleManager, SignInManager<AppUser10> signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
        }

        /// <summary>
        /// Will this even be used?
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            return View();
        }

        // (C)REATE

        #region (C)REATE

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateUser(AppUser10 user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_userManager.FindByNameAsync(user.UserName).Result != null)
            {
                return Content("The requested Username is already in use. Please try something else.", contentType: user.UserName);
            }

            user.UserToken = await _userManager.GenerateUserTokenAsync(user, TokenOptions.DefaultAuthenticatorProvider, "Authentication");

            var result = await _userManager.CreateAsync(user);

            if (result.Succeeded)
            {
                return CreatedAtAction(nameof(CreateUser), user);
            }
            else
            {
                return Content("Something went wrong when creating the user. Please try again");
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register(AppUser10 user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_userManager.FindByNameAsync(user.UserName).Result != null)
            {
                return Content("The requested Username is already in use. Please try something else.", contentType: user.UserName);
            }

            user.UserToken = await _userManager.GenerateUserTokenAsync(user, TokenOptions.DefaultAuthenticatorProvider, "Authentication");

            var result = await _userManager.CreateAsync(user);

            if (result.Succeeded)
            {
                return RedirectToAction(nameof(SignIn), "Assignment10Identity", new { user10 = user });
            }
            else
            {
                return Content("Something went wrong. Please try again");
            }
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateRole(string role)
        {
            if (string.IsNullOrWhiteSpace(role))
            {
                return BadRequest();
            }

            if (await _roleManager.RoleExistsAsync(role))
            { // Is this really smart? Might be a giveaway for bad users that this role exists.
                return Content("This role already exists.");
            }
            var newRole = new IdentityRole(role);

            if (newRole == null)
            {
                return BadRequest();
            }
            var result = await _roleManager.CreateAsync(newRole);

            if (result.Succeeded)
            {
                return CreatedAtAction(nameof(CreateRole), newRole);
            }
            else
            {
                return Content("Something went wrong when creating role. Please try again.");
            }
        }

        #endregion

        // (R)EAD

        #region (R)EAD

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();

            if (users == null || users.Count == 0)
            {
                return Content("There are no users available.");
            }
            else
            {
                return Accepted(users);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> FindUser(string userId)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                return BadRequest();
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return Content("Something went wrong, please try again");
            }

            var result = await _userManager.VerifyUserTokenAsync(user, TokenOptions.DefaultAuthenticatorProvider, "Authentication", user.UserToken);

            if (result == true)
            {
                return Accepted(user);
            }
            else
            {
                return Content("Something went wrong.");
            }
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _roleManager.Roles.ToListAsync();

            if (roles == null || roles.Count == 0)
            {
                return Content("There are no roles available? Weird conundrum.");
            }
            else
            {
                return Accepted(roles);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> FindRole(string roleId)
        {
            if (!User.IsInRole("Admin"))
            {
                return Content("You do not have high enough moderation-powers to access this.");
            }
            if (string.IsNullOrWhiteSpace(roleId))
            {
                return BadRequest();
            }
            var role = await _roleManager.FindByIdAsync(roleId);

            if (role == null)
            {
                return NotFound();
            }
            else
            {
                return Accepted(role);
            }
        }

        #endregion

        // SignIn / SignOut
        #region SignIn / SignOut

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> SignIn(LoginUser10 user10)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByNameAsync(user10.UserName);

            if (user == null)
            {
                return NotFound();
            }

            var verify = await _userManager.VerifyUserTokenAsync(user, TokenOptions.DefaultAuthenticatorProvider, "Authentication", user.UserToken);

            if (verify == false)
            {
                return Content("Something went wrong.");
            }

            var result = await _signInManager.PasswordSignInAsync(user, user10.Password, true, false);

            if (result.Succeeded)
            {
                return Accepted(user);
            }
            else
            {
                return Content("Something went wrong.");
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SignOut(string userName, string userToken)
        {
            if (string.IsNullOrWhiteSpace(userName) || string.IsNullOrWhiteSpace(userToken))
            {
                return BadRequest();
            }

            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.VerifyUserTokenAsync(user, TokenOptions.DefaultAuthenticatorProvider, "Authentication", userToken);

            if (result == true)
            {
                await _signInManager.SignOutAsync();

                return Content("User was successfully signed out");
            }
            else
            {
                return Content("Cannot verify if user exists. Please try again.");
            }
        }

        #endregion

        // (U)PDATE

        #region (U)PDATE

        [HttpPut]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin, NormalUser")]
        public async Task<IActionResult> EditUser(AppUser10 user10)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var verify = await _userManager.VerifyUserTokenAsync(user10, TokenOptions.DefaultAuthenticatorProvider, "Authentication", user10.UserToken);

            if (verify == false)
            {
                return BadRequest();
            }

            var user = await _userManager.FindByIdAsync(user10.Id);

            if (user == null)
            {
                return NotFound();
            }


            user.UserName = user10.UserName;
            user.FirstName = user10.FirstName;
            user.LastName = user10.LastName;
            user.Age = user10.Age;
            user.Email = user10.Email;
            user.PhoneNumber = user10.PhoneNumber;

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return RedirectToAction(nameof(FindUser), "Assignment10Identity", new { userId = user.Id });
            }
            else
            {
                return Content("Something went wrong when updating user. Please try again.");
            }
        }

        [HttpPatch]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditPassword(ChangePassword10 change)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByIdAsync(change.UserId);

            if (change.OldPassword == change.NewPassword)
            {
                return Content("Your password cannot be the same as your old password. Please try something else.");
            }

            if (user == null)
            {
                return NotFound();
            }

            var verify = await _userManager.VerifyUserTokenAsync(user, TokenOptions.DefaultAuthenticatorProvider, "Authentication", change.UserToken);

            if (verify == false)
            {
                return Content("Something went wrong.");
            }

            var result = await _userManager.ChangePasswordAsync(user, change.OldPassword, change.NewPassword);

            if (result.Succeeded)
            {
                return Content("Password was successfully changed.");
            }
            else
            {
                return Content("Something went wrong when updating password. Please try again.");
            }
        }

        [HttpPut]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> EditRole(IdentityRole role10)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var role = await _roleManager.FindByIdAsync(role10.Id);

            if (role == null)
            {
                return NotFound();
            }

            role.Name = role10.Name;

            var result = await _roleManager.UpdateAsync(role);

            if (result.Succeeded)
            {
                return RedirectToAction(nameof(FindRole), "Assignment10Identity", new { roleId = role.Id });
            }
            else
            {
                return Content("Something went wrong when updating the role, please try again.");
            }
        }

        #endregion

        // (D)ELETE
        
        #region (D)ELETE

        [HttpDelete]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteUser(string userId, string userToken)
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(userToken))
            {
                return BadRequest();
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }


            var verify = await _userManager.VerifyUserTokenAsync(user, TokenOptions.DefaultAuthenticatorProvider, "Authentication", userToken);

            if (verify == false)
            {
                return BadRequest();
            }
            var test = User.Identity.Name;

            if (test != user.UserName && !User.IsInRole("Admin"))
            {
                return Content("Cannot delete user.");
            }

            var result = await _userManager.DeleteAsync(user);

            if (result.Succeeded)
            {
                return Content("User was successfully deleted.");
            }
            else
            {
                return Content("Something went wrong when deleting user. Please try again");
            }
        }

        [HttpDelete]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteRole(string role)
        {
            if (string.IsNullOrWhiteSpace(role))
            {
                return BadRequest();
            }

            var verifyRole = await _roleManager.FindByNameAsync(role);

            if (verifyRole == null)
            {
                return Content("Role does not exist.");
            }

            var result = await _roleManager.DeleteAsync(verifyRole);

            if (result.Succeeded)
            {
                return Content("Role was successfully deleted.");
            }
            else
            {
                return Content("Something went wrong when deleting role.");
            }
        }

        #endregion
    }
}