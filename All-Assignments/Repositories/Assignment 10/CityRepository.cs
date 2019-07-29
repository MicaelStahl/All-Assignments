using All_Assignments.Database;
using All_Assignments.Interfaces.Assignment_10;
using All_Assignments.Models.Assignment10Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace All_Assignments.Repositories.Assignment_10
{
    public class CityRepository : ICityRepository
    {
        #region D.I
        private readonly AllAssignmentsDbContext _db;

        public CityRepository(AllAssignmentsDbContext db)
        {
            _db = db;
        }
        #endregion

        #region Create
        public async Task<City> Create(City city)
        {
            if (string.IsNullOrWhiteSpace(city.Name) || string.IsNullOrWhiteSpace(city.Population))
            {
                return null;
            }

            var newCity = new City()
            {
                Name = city.Name,
                Population = city.Population,
                People = city.People,
                Country = city.Country
            };

            if (newCity == null)
            {
                return null;
            }

            await _db.Cities.AddAsync(newCity);

            await _db.SaveChangesAsync();

            return newCity;
        }
        #endregion

        #region Read
        public async Task<City> FindCity(Guid id)
        {
            if (id == null || string.IsNullOrWhiteSpace(id.ToString()))
            {
                return null;
            }

            var city = await _db.Cities.SingleOrDefaultAsync(x => x.Id == id);

            if (city == null)
            {
                return null;
            }
            return city;
        }

        public async Task<List<City>> AllCities()
        {
            var cities = await _db.Cities.ToListAsync();

            if (cities == null || cities.Count == 0)
            {
                return null;
            }
            return cities;
        }
        #endregion

        #region Update
        public async Task<City> Edit(City city)
        {
            if (string.IsNullOrWhiteSpace(city.Name) || string.IsNullOrWhiteSpace(city.Population))
            {
                return null;
            }

            var original = await _db.Cities.SingleOrDefaultAsync(x => x.Id == city.Id);

            if (original == null)
            {
                return null;
            }

            original.Name = city.Name;
            original.Population = city.Population;
            original.Country = city.Country;
            original.People = city.People;

            await _db.SaveChangesAsync(true);

            return original;
        }

        public async Task<City> AddPeople(Guid cityId, List<Person> personId)
        {
            if (cityId == null || string.IsNullOrWhiteSpace(cityId.ToString()) || personId == null || personId.Count == 0)
            {
                return null;
            }

            var city = await _db.Cities.SingleOrDefaultAsync(x => x.Id == cityId);

            if (city == null)
            {
                return null;
            }

            city.People.AddRange(personId);

            await _db.SaveChangesAsync();

            return city;
        }

        #endregion

        #region Delete
        public async Task<bool> Delete(Guid id)
        {
            if (id == null || string.IsNullOrWhiteSpace(id.ToString()))
            {
                return false;
            }

            var city = await _db.Cities.SingleOrDefaultAsync(x => x.Id == id);

            if (city == null)
            {
                return false;
            }

            var result = _db.Cities.Remove(city);

            await _db.SaveChangesAsync();

            var verify = await _db.Cities.SingleOrDefaultAsync(x => x.Id == id);

            if (verify == null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        #endregion
    }
}
