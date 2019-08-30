using System;
using System.Threading.Tasks;
using All_Assignments.Interfaces.Assignment_10;
using All_Assignments.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace All_Assignments.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityApiController : Controller
    {
        public readonly UserManager<AppUser10> _userManager;
        public readonly RoleManager<IdentityRole> _roleManager;
        public readonly SignInManager<AppUser10> _signInManager;

        private readonly IUserRepository _service;

        public IdentityApiController(UserManager<AppUser10> userManager,
            RoleManager<IdentityRole> roleManager, SignInManager<AppUser10> signInManager,
            IUserRepository service)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _service = service;
        }

        public IActionResult Index()
        {
            return View();
        }

        #region (C)REATE

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterUser10 user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var createdUser = await _service.Create(user);

                if (string.IsNullOrWhiteSpace(createdUser.Failed))
                {
                    return Ok(createdUser.Success);
                }
                else
                {
                    throw new Exception(createdUser.Failed);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("create-role")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateRole(string role)
        {
            if (string.IsNullOrWhiteSpace(role))
            {
                return BadRequest();
            }

            if (await _roleManager.RoleExistsAsync(role))
            { 
                return BadRequest("This role already exists.");
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
                return BadRequest("Something went wrong when creating role. Please try again.");
            }
        }

        #endregion

        #region (R)EAD

        [HttpPost("get-user")]
        public async Task<IActionResult> GetUser(ReturnedUserVM userVM)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new Exception("Something went wrong. Please try again.");
                }

                var user = await _service.FindUser(userVM.UserId, userVM.UserToken);

                if (user.ErrorMessage == null)
                {
                    return Ok(user);
                }

                if (user.ErrorMessage.Contains("found"))
                {
                    return NotFound(user.ErrorMessage);
                }
                else if (user.ErrorMessage.Contains("verify"))
                {
                    return Unauthorized(user.ErrorMessage);
                }
                else
                {
                    throw new Exception(user.ErrorMessage);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
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

        #region SignIn / SignOut

        [HttpPost("signin")]
        [AllowAnonymous]
        public async Task<IActionResult> SignIn(LoginUser10 user10)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _service.LogInUser(user10);

            if (!string.IsNullOrWhiteSpace(result.ErrorMessage))
            {
                return BadRequest(result.ErrorMessage);
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpPost("signout")]
        public async Task<IActionResult> SignOut(ReturnedUserVM userVM)
        {
            var result = await _service.LogOutUser(userVM.UserId, userVM.UserToken);

            if (result.Success != null)
            {
                return Ok(result.Success);
            }
            else
            {
                return BadRequest(result.Failed);
            }
        }

        #endregion

        #region (U)PDATE

        [HttpPut("edit-user")]
        public async Task<IActionResult> EditUser(UserDetailsVM user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new Exception("Not all fields were filled correctly.");
                }

                var result = await _service.Edit(user);

                if (string.IsNullOrWhiteSpace(result.ErrorMessage))
                {
                    return Ok(result);
                }
                else if (result.ErrorMessage.Contains("found"))
                {
                    return NotFound(result.ErrorMessage);
                }
                else
                {
                    throw new Exception(result.ErrorMessage);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("change-password")]
        public async Task<IActionResult> EditPassword(ChangePassword10 change)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new Exception(ModelState.ToString());
                }

                var result = await _service.ChangePassword(change);

                if (string.IsNullOrWhiteSpace(result.Failed))
                {
                    return Ok(result);
                }
                else if (result.Failed.Contains("found"))
                {
                    return NotFound(result.Failed);
                }
                else
                {
                    throw new Exception(result.Failed);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("edit-role")]
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
                return BadRequest("Something went wrong when updating the role, please try again.");
            }
        }

        #endregion

        #region (D)ELETE

        [HttpPost("delete-user")]
        public async Task<IActionResult> DeleteUser(DeleteUserVM user)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(user.UserId) || string.IsNullOrWhiteSpace(user.UserToken))
                {
                    throw new Exception("Something went wrong.");
                }

                var result = await _service.DeleteUser(user);

                if (string.IsNullOrWhiteSpace(result.Failed))
                {
                    return Ok(result.Success);
                }
                else if (result.Failed.Contains("found"))
                {
                    return NotFound(result.Failed);
                }
                else
                {
                    throw new Exception(result.Failed);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete-role")]
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
                return BadRequest("Role does not exist.");
            }

            var result = await _roleManager.DeleteAsync(verifyRole);

            if (result.Succeeded)
            {
                return Ok("Role was successfully deleted.");
            }
            else
            {
                return BadRequest("Something went wrong when deleting role.");
            }
        }

        #endregion
    }
}