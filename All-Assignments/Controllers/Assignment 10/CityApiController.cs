using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using All_Assignments.Interfaces.Assignment_10;
using All_Assignments.Models.Assignment10Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace All_Assignments.Controllers
{
    //[Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class CityApiController : ControllerBase
    {
        private readonly ICityRepository _service;

        public CityApiController(ICityRepository service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cities = await _service.AllCities();

            if (cities == null)
            {
                return Content("There are no cities available in the database. Please add some.");
            }

            return Created(nameof(GetAll), cities);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            if (id == null ||string.IsNullOrWhiteSpace(id.ToString()))
            {
                return BadRequest();
            }

            var city = await _service.FindCity(id);

            if (city == null)
            {
                return NotFound("The requested city was not found. Please try again.");
            }

            return Accepted(nameof(Get), city);
        }

        [HttpPost]
        public async Task<IActionResult> Create(City city)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newCity = await _service.Create(city);

            if (newCity == null)
            {
                return Content("Something went wrong when creating the city. Please try again");
            }

            return Created(nameof(Create), newCity);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(City city)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newCity = await _service.Edit(city);

            if (newCity == null)
            {
                return Content("Something went wrong when updating the city. Please try again.");
            }

            return Created(nameof(Edit), newCity);
        }

        [HttpPut("{add-people}")]
        public async Task<IActionResult> AddPeople(Guid cityId, List<Person> people)
        {
            if (cityId == null || string.IsNullOrWhiteSpace(cityId.ToString()) || people == null || people.Count == 0)
            {
                return BadRequest();
            }

            var city = await _service.AddPeople(cityId, people);

            if (city == null)
            {
                return Content("Something went wrong. Please try again.");
            }

            return Created(nameof(AddPeople), city);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (id == null || string.IsNullOrWhiteSpace(id.ToString()))
            {
                return BadRequest();
            }

            var result = await _service.Delete(id);

            if (result == false)
            {
                return Content("Something went wrong when trying to delete city. Please try again.");
            }

            return Created(nameof(Delete), result);
        }
    }
}