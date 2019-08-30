using System;
using System.Threading.Tasks;
using All_Assignments.Interfaces.Assignment_10.Admin;
using All_Assignments.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace All_Assignments.Controllers.Assignment_10
{
    /// <summary>
    /// This api exists ONLY for the admin and is not accessible for anyone that does not have the Administrator role.
    /// </summary>
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class AdminApiController : Controller
    {
        private readonly IAdminRepository _service;

        public AdminApiController(IAdminRepository service)
        {
            _service = service;
        }

        [HttpPost("get-user")]
        public async Task<IActionResult> GetUser(AdminVerificationForUserVM admin)
        {
            if (string.IsNullOrWhiteSpace(admin.AdminId) || string.IsNullOrWhiteSpace(admin.AdminToken) ||
                string.IsNullOrWhiteSpace(admin.UserId))
            {
                return BadRequest("Something went wrong.");
            }

            var user = await _service.GetUser(admin);

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

        [HttpPost("get-users")]
        public async Task<IActionResult> GetUsers(AdminVerificationVM admin)
        {
            try
            {
                var users = await _service.GetUsers(admin);

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

        [HttpPost("create-user")]
        public async Task<IActionResult> CreateUser(RegisterAdminUser10 user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _service.Create(user);

            if (result.ErrorMessage == null)
            {
                return Ok(result);
            }

            return BadRequest(result.ErrorMessage);
        }

        [HttpPut("edit-user")]
        public async Task<IActionResult> EditUser(AdminEditUserVM userVM)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new Exception("Please check all fields and then try again.");
                }

                var result = await _service.EditUser(userVM);

                if (result.ErrorMessage == null)
                {
                    return Ok(result);
                }

                throw new Exception(result.ErrorMessage);

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
                    return Ok(result);
                }

                throw new Exception(result.Failed);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("delete-user")]
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
