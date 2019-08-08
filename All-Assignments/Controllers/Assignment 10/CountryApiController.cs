using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using All_Assignments.Interfaces.Assignment_10;
using All_Assignments.Models.Assignment10Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace All_Assignments.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryApiController : ControllerBase
    {
        private readonly ICountryRepository _service;

        public CountryApiController(ICountryRepository service)
        {
            _service = service;
        }

        [HttpGet("simple")]
        public async Task<IActionResult> GetAllForCity()
        {
            var countries = await _service.AllCountries();

            if (countries == null)
            {
                return null;
            }

            return Ok(countries);
        }

        /// <summary>
        /// Change this one later to match the required needs for the front-end list.
        /// Will also have to change the Repository when I change this one.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var countries = await _service.AllCountries();

            if (countries == null)
            {
                return Content("There are no cities available in the database. Please add some.");
            }

            return Ok(countries);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            if (id == null || string.IsNullOrWhiteSpace(id.ToString()))
            {
                return BadRequest();
            }

            var country = await _service.FindCountry(id);

            if (country == null)
            {
                return NotFound("The requested city was not found. Please try again.");
            }

            return Ok(country);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Country country)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newCountry = await _service.Create(country);

            if (newCountry == null)
            {
                return Content("Something went wrong when creating the city. Please try again");
            }

            return Ok(newCountry);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Country country)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newCountry = await _service.Edit(country);

            if (newCountry == null)
            {
                return Content("Something went wrong when updating the city. Please try again.");
            }

            return Ok(newCountry);
        }

        [HttpPut("add-city/{id}")]
        public async Task<IActionResult> AddCity(Guid countryId, List<City> cities)
        {
            if (countryId == null || string.IsNullOrWhiteSpace(countryId.ToString()) || cities == null || cities.Count == 0)
            {
                return BadRequest();
            }

            var country = await _service.AddCities(countryId, cities);

            if (country == null)
            {
                return Content("Something went wrong. Please try again.");
            }

            return Ok(country);
        }

        [HttpDelete("{id}")]
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

            return Ok(result);
        }
    }
}