using All_Assignments.Models.Assignment10Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace All_Assignments.Interfaces.Assignment_10
{
    public interface ICityRepository
    {
        // Create
        Task<City> Create(City city);

        // Read
        Task<City> FindCity(Guid id);
        Task<List<City>> AllCities();

        // Update
        Task<City> Edit(City city);

        Task<City> AddPeople(Guid cityId, List<Person> personId);

        // Delete
        Task<bool> Delete(Guid id);
    }
}
