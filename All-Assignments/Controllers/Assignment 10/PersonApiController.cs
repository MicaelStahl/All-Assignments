using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using All_Assignments.Interfaces.Assignment_10;
using All_Assignments.Models.Assignment10Models;
using All_Assignments.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace All_Assignments.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonAPIController : ControllerBase
    {
        private readonly IPersonRepository _service;

        public PersonAPIController(IPersonRepository service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var people = await _service.AllPeople();

            if (people == null)
            {
                return Content("There's no people available. Please either create some or contact administration");
            }

            return Created(nameof(Get), people);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id) 
        {
            if (id == null || string.IsNullOrWhiteSpace(id.ToString()))
            {
                return BadRequest();
            }

            var person = await _service.FindPerson(id);

            if (person == null)
            {
                return Content("The requested person was not found. Please try again");
            }

            return Created(nameof(GetAll), person);
        }

        [HttpPost]
        [AutoValidateAntiforgeryToken]
        public async Task<IActionResult> Create(Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newPerson = await _service.Create(person);

            if (newPerson == null)
            {
                return Content("Something went wrong during the creation. Please try again.");
            }

            return Created(nameof(Create), newPerson);
        }

        [HttpPut]
        [AutoValidateAntiforgeryToken]
        public async Task<IActionResult> Edit(Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newPerson = await _service.Edit(person);

            if (newPerson == null)
            {
                return Content("Something went wrong while updating the person. Please try again");
            }

            return Created(nameof(Edit), newPerson);
        }

        [HttpDelete]
        [AutoValidateAntiforgeryToken]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (id == null || string.IsNullOrWhiteSpace(id.ToString()))
            {
                return BadRequest();
            }

            var removed = await _service.Delete(id);

            if (removed)
            {
                return Content("The person was successfully removed.");
            }

            return Content("Something went wrong when removing person. Please try again");
        }
    }
}