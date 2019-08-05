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

            return Ok(people);
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

            return Ok(person);
        }

        [HttpPost]
        //[AutoValidateAntiforgeryToken]
        public async Task<IActionResult> Create(PersonWithCityIdVM person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newPerson = await _service.Create(person.Person, person.CityId);

            if (newPerson == null)
            {
                return NoContent();
            }

            //return Ok(newPerson);

            return RedirectToAction(nameof(Get), "PersonApi", new { id = newPerson.Id });
        }

        [HttpPut("{id}")]
        //[AutoValidateAntiforgeryToken]
        public async Task<IActionResult> Edit(PersonWithCityIdVM person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newPerson = await _service.Edit(person.Person, person.CityId);

            if (newPerson == null)
            {
                return Content("Something went wrong while updating the person. Please try again");
            }

            PersonWithCityVM personVM = new PersonWithCityVM
            {
                CityName = newPerson.City?.Name ?? "Homeless",
                CityId = newPerson.City?.Id ?? null
            };
            newPerson.City = null;
            personVM.Person = newPerson;

            return Ok(personVM);
        }

        [HttpDelete("{id}")]
        //[AutoValidateAntiforgeryToken]
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null || string.IsNullOrWhiteSpace(id.ToString()))
            {
                return BadRequest();
            }

            var removed = await _service.Delete((Guid)id);

            if (removed)
            {
                return Ok("The person was successfully removed.");
            }

            return Content("Something went wrong when removing person. Please try again");
        }
    }
}