﻿using All_Assignments.Models.Assignment10Models;
using All_Assignments.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace All_Assignments.Interfaces.Assignment_10
{
    public interface ICityRepository
    {
        // Create
        Task<CityWithCountryVM> Create(City city, Guid? countryId);

        // Read
        Task<CityWithCountryVM> FindCity(Guid id);
        Task<CityEditVM> FindCityForEdit(Guid id);
        Task<List<CityWithCountryVM>> AllCitiesWithCountry();
        Task<List<City>> AllCities();

        // Update
        Task<City> Edit(City city, Guid? countryId);

        Task<City> AddPeople(Guid cityId, List<Person> personId);

        // Delete
        Task<bool> Delete(Guid id);
    }
}
