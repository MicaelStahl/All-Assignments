﻿using All_Assignments.Database;
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
    public class CountryRepository : ICountryRepository
    {
        #region D.I
        private readonly AllAssignmentsDbContext _db;

        public CountryRepository(AllAssignmentsDbContext db)
        {
            _db = db;
        }
        #endregion

        #region Create
        public async Task<Country> Create(Country country)
        {
            if (string.IsNullOrWhiteSpace(country.Name) || string.IsNullOrWhiteSpace(country.Population))
            {
                return null;
            }

            var newCountry = new Country()
            {
                Name = country.Name,
                Population = country.Population,
                Cities = country.Cities
            };

            if (newCountry == null)
            {
                return null;
            }

            await _db.Countries.AddAsync(newCountry);

            await _db.SaveChangesAsync();

            return newCountry;
        }
        #endregion

        #region Read
        public async Task<CountryWithCitiesVM> FindCountry(Guid id)
        {
            if (id == null || string.IsNullOrWhiteSpace(id.ToString()))
            {
                return null;
            }

            var country = await _db.Countries
                .Include(x => x.Cities)
                .SingleOrDefaultAsync(x => x.Id == id);

            if (country == null)
            {
                return null;
            }

            CountryWithCitiesVM countryVM = new CountryWithCitiesVM
            {
                Cities = country?.Cities ?? null,
            };
            country.Cities = null;
            countryVM.Country = country;

            return countryVM;
        }

        public async Task<List<CountryWithCitiesVM>> AllCountries()
        {
            //List<CityWithCountryVM> citiesVM = new List<CityWithCountryVM>();

            //foreach (var item in cities)
            //{
            //    CityWithCountryVM city = new CityWithCountryVM()
            //    {
            //        CountryId = item.Country?.Id,
            //        CountryName = item.Country?.Name ?? "Stateless",
            //        People = item.People ?? null
            //    };

            //    item.People = null;
            //    item.Country = null;
            //    city.City = item;

            //    citiesVM.Add(city);

            try
            {
                var countries = await _db.Countries
                    .Include(x => x.Cities)
                    .ToListAsync();

                if (countries == null || countries.Count == 0)
                {
                    throw new Exception();
                }

                List<CountryWithCitiesVM> countriesVM = new List<CountryWithCitiesVM>();

                foreach (var item in countries)
                {
                    var country = new CountryWithCitiesVM
                    {
                        Cities = item.Cities
                    };

                    item.Cities = null;
                    country.Country = item;

                    countriesVM.Add(country);

                    //countriesVM.Countries.Add(new CountryWithCitiesVM() { Country = item, Cities = item.Cities });
                }

                return countriesVM;
            }
            catch
            {
                return null;
            }
        }
        #endregion

        #region Update
        public async Task<Country> Edit(Country country)
        {
            if (string.IsNullOrWhiteSpace(country.Name) || string.IsNullOrWhiteSpace(country.Population))
            {
                return null;
            }

            var original = await _db.Countries.SingleOrDefaultAsync(x => x.Id == country.Id);

            if (original == null)
            {
                return null;
            }

            original.Name = country.Name;
            original.Population = country.Population;
            original.Cities = country.Cities;

            await _db.SaveChangesAsync();

            return original;
        }

        public async Task<Country> AddCities(Guid countryId, List<City> cities)
        {
            if (countryId == null || string.IsNullOrWhiteSpace(countryId.ToString()) || cities == null || cities.Count == 0)
            {
                return null;
            }

            var country = await _db.Countries.SingleOrDefaultAsync(x => x.Id == countryId);

            if (country == null)
            {
                return null;
            }

            country.Cities.AddRange(cities);

            await _db.SaveChangesAsync();

            return country;
        }
        #endregion

        #region Delete
        public async Task<bool> Delete(Guid id)
        {
            if (id == null || string.IsNullOrWhiteSpace(id.ToString()))
            {
                return false;
            }

            var country = await _db.Countries.SingleOrDefaultAsync(x => x.Id == id);

            if (country == null)
            {
                return false;
            }

            _db.Countries.Remove(country);

            await _db.SaveChangesAsync();

            var verify = _db.Countries.SingleOrDefaultAsync(x => x.Id == id);

            if (verify == null)
            {
                return true;
            }

            return false;
        }
        #endregion
    }
}
