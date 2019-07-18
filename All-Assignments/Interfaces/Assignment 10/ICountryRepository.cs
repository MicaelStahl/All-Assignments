﻿using All_Assignments.Models.Assignment10Models;
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
        Task<Country> FindCity(Guid id);
        Task<List<Country>> AllCountries();

        // Update
        Task<Country> Edit(Country country);

        // Delete
        Task<bool> Delete(Guid id);
    }
}
