﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using All_Assignments.Interfaces.Assignment_10.Admin;
using All_Assignments.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace All_Assignments.Controllers.Assignment_10
{
    /// <summary>
    /// This api exists ONLY for the admin and is not accessible for anyone that does not have the Administrator role.
    /// In the future at least...
    /// </summary>
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    //[Authorize(Roles = "Administrator")]
    public class AdminApiController : Controller
    {
        private readonly IAdminRepository _service;

        public AdminApiController(IAdminRepository service)
        {
            _service = service;
        }

        [HttpGet("get-user/{id}")]
        public async Task<IActionResult> GetUser(AdminVerificationForUserVM verificationVM)
        {
            if (string.IsNullOrWhiteSpace(verificationVM.AdminId) || string.IsNullOrWhiteSpace(verificationVM.AdminToken) ||
                string.IsNullOrWhiteSpace(verificationVM.UserId))
            {
                return BadRequest("Something went wrong.");
            }

            var user = await _service.GetUser(verificationVM);

            if (user.ErrorMessage == null)
            {
                return Ok(user);
            }

            if (user.ErrorMessage.Contains("Found"))
            {
                return NotFound(user.ErrorMessage);
            }
            return BadRequest(user.ErrorMessage);
        }

        [HttpGet("get-users")]
        public async Task<IActionResult> GetUsers(AdminVerificationVM verificationVM)
        {
            try
            {
                var users = await _service.GetUsers(verificationVM);

                // Doing this since in the repository I create 1 user if something goes wrong.
                // So I verify if the user is the "error" user created, or a normal user.
                if (users.ErrorMessage == null)
                {
                    return Ok(users);
                }

                if (users.ErrorMessage.Contains("found"))
                {
                    return NotFound(users.ErrorMessage);
                }

                throw new Exception(users.ErrorMessage);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateUser(RegisterAdminUser10 user10)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _service.Create(user10);

            if (result.Failed == null)
            {
                return Ok(result.Success);
            }

            return BadRequest(result.Failed);
        }

        [HttpPut("edit-user")]
        public async Task<IActionResult> EditUser(UserDetailsVM userVM)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new Exception("Please check all fields and then try again.");
                }

                var result = await _service.EditUser(userVM);

                if (result.Failed == null)
                {
                    return Ok(result.Success);
                }

                throw new Exception(result.Failed);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("change-password")]
        public async Task<IActionResult> ChangeUserPassword(AdminChangeUserPassword10 changePassword)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new Exception("Please check all fields and then try again.");
                }

                if (string.IsNullOrWhiteSpace(changePassword.AdminId) || string.IsNullOrWhiteSpace(changePassword.AdminToken))
                {
                    throw new Exception("Something went wrong!");
                }

                var result = await _service.ChangeUserPassword(changePassword);

                if (result.Failed == null)
                {
                    return Ok(result.Success);
                }

                throw new Exception(result.Failed);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete-user")]
        public async Task<IActionResult> DeleteUser(AdminVerificationForUserVM verificationVM)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new Exception("Something went wrong!");
                }
                if (string.IsNullOrWhiteSpace(verificationVM.UserId))
                {
                    throw new Exception("Something went wrong. Please try again.");
                }

                var result = await _service.DeleteUser(verificationVM);

                if (result.Failed == null)
                {
                    return Ok(result.Success);
                }

                if (result.Failed.Contains("found"))
                {
                    return NotFound(result.Failed);
                }

                throw new Exception(result.Failed);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
