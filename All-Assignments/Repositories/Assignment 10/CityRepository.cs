using All_Assignments.Database;
using All_Assignments.Interfaces.Assignment_10;
using All_Assignments.Models.Assignment10Models;
using All_Assignments.ViewModels;
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
        public async Task<City> Create(City city, Guid? countryId)
        {
            if (string.IsNullOrWhiteSpace(city.Name) || string.IsNullOrWhiteSpace(city.Population))
            {
                return null;
            }

            Country country = new Country();

            country = null;

            if (countryId != null)
            {
                country = await _db.Countries.SingleOrDefaultAsync(x => x.Id == countryId);

                if (country == null)
                {
                    return null;
                }
            }

            var newCity = new City()
            {
                Name = city.Name,
                Population = city.Population,
                People = city.People,
                Country = country
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
        public async Task<CityWithCountryVM> FindCity(Guid id)
        {
            if (id == null || string.IsNullOrWhiteSpace(id.ToString()))
            {
                return null;
            }

            var city = await _db.Cities
                .Include(x=>x.Country)
                .Include(x=>x.People)
                .SingleOrDefaultAsync(x => x.Id == id);


            if (city == null)
            {
                return null;
            }

            CityWithCountryVM cityVM = new CityWithCountryVM
            {
                CountryId = city.Country?.Id,
                CountryName = city.Country?.Name,
                People = city.People ?? null
            };

            city.People = null;
            city.Country = null;
            cityVM.City = city;

            return cityVM;
        }

        /// <summary>
        /// Not using this as of (2019-08-06)
        /// </summary>
        public async Task<City> FindPeopleInCityAndCountry(Guid id)
        {
            if (id == null || string.IsNullOrWhiteSpace(id.ToString()))
            {
                return null;
            }

            var city = await _db.Cities
                .Include(x => x.People)
                .Include(x => x.Country)
                .SingleOrDefaultAsync(x => x.Id == id);

            if (city == null)
            {
                return null;
            }

            return city;
        }

        public async Task<List<City>> AllCities()
        {
            var cities = await _db.Cities
                .ToListAsync();

            if (cities == null || cities.Count == 0)
            {
                return null;
            }

            return cities;
        }

        public async Task<List<CityWithCountryVM>> AllCitiesWithCountry()
        {
            var cities = await _db.Cities
                .Include(x=>x.People)
                .Include(x=>x.Country)
                .ToListAsync();


            if (cities == null || cities.Count == 0)
            {
                return null;
            }

            List<CityWithCountryVM>citiesVM = new List<CityWithCountryVM>();

            foreach (var item in cities)
            {
                CityWithCountryVM city = new CityWithCountryVM()
                {
                    CountryId = item.Country?.Id,
                    CountryName = item.Country?.Name ?? "Stateless",
                    People = item.People ?? null
                };

                item.People = null;
                item.Country = null;
                city.City = item;

                citiesVM.Add(city);
            }

            return citiesVM;
        }
        #endregion

        #region Update
        public async Task<City> Edit(City city, Guid? countryId)
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

            Country country = new Country();

            if (countryId != null)
            {
                country = await _db.Countries.SingleOrDefaultAsync(x => x.Id == countryId);

                if (country == null)
                {
                    return null;
                }
            }

            original.Name = city.Name;
            original.Population = city.Population;
            original.Country = country;
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
