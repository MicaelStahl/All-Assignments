﻿using All_Assignments.Models.Assignment10Models;
using All_Assignments.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace All_Assignments.Interfaces.Assignment_10
{
    public interface ICountryRepository
    {
        // Create
        Task<Country> Create(Country country);

        // Read
        Task<CountryWithCitiesVM> FindCountry(Guid id);
        Task<List<CountryWithCitiesVM>> AllCountries();

        // Update
        Task<Country> Edit(Country country);
        Task<Country> AddCities(Guid countryId, List<City> cityId);

        // Delete
        Task<bool> Delete(Guid id);
    }
}
