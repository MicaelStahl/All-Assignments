using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using All_Assignments.Interfaces.Assignment_10;
using All_Assignments.Models.Assignment10Models;
using All_Assignments.ViewModels;
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
                return NoContent();
            }

            return Ok(cities);
        }

        [HttpGet("cities")]
        public async Task<IActionResult> GetAllCities()
        {
            var cities = await _service.AllCitiesWithCountry();

            if (cities == null)
            {
                return NoContent();
            }

            return Ok(cities);

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
                return NoContent();
            }

            return Ok(city);
        }

        //[HttpGet("city/{id}")]
        //public async Task<IActionResult> GetCity(Guid id)
        //{
        //    if (id == null || string.IsNullOrWhiteSpace(id.ToString()))
        //    {
        //        return BadRequest();
        //    }

        //    var city = await _service.FindPeopleInCityAndCountry(id);

        //    if (city == null)
        //    {
        //        return NoContent();
        //    }

        //    return Ok(city);
        //}

        [HttpPost]
        public async Task<IActionResult> Create(CityWithCountryIdVM city)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newCity = await _service.Create(city.City, city.CountryId);

            if (newCity == null)
            {
                return Content("Something went wrong when creating the city. Please try again");
            }

            return Ok(newCity);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(CityWithCountryIdVM city)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newCity = await _service.Edit(city.City, city.CountryId);

            if (newCity == null)
            {
                return Content("Something went wrong when updating the city. Please try again.");
            }

            return Ok(newCity);
        }

        [HttpPut("/add-people")]
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

            return Ok(city);
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