using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using All_Assignments.Interfaces.Assignment_10.Admin;
using All_Assignments.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace All_Assignments.Controllers.Assignment_10
{
    [Route("api/[controller]")]
    [Authorize]
    //[Authorize(Roles = "Administrator")]
    public class AdminApiController : Controller
    {
        private readonly IAdminRepository _service;

        public AdminApiController(IAdminRepository service)
        {
            _service = service;
        }

        [HttpGet("get-user")]
        public async Task<IActionResult> GetUser(string userId)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                return BadRequest("Something went wrong.");
            }

            var user = await _service.GetUser(userId);

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
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var users = await _service.GetUsers();

                // Doing this since in the repository I create 1 user if something goes wrong.
                // So I verify that the user is the "error" user created, or a normal user.
                if (users.Count == 1)
                { 
                    // Should never throw an exception since there should only be one element in the list.
                    // If it were to throw an exception however, then I'll quite being a programmer.
                    var user = users.Single();

                    if (user.ErrorMessage != null)
                    {
                        return Ok(users);
                    }
                    else if (user.ErrorMessage.Contains("found"))
                    {
                        return NotFound(user.ErrorMessage);
                    }
                    else
                    {
                        throw new Exception(user.ErrorMessage);
                    }
                }

                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(RegisterUser10 user10)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _service.Create(user10);

            if (user.ErrorMessage == null)
            {
                return Ok(user);
            }

            return BadRequest(user.ErrorMessage);
        }
    }
}
