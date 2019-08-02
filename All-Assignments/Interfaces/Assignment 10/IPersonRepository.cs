using All_Assignments.Models.Assignment10Models;
using All_Assignments.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace All_Assignments.Interfaces.Assignment_10
{
    public interface IPersonRepository
    {
        // Create
        Task<Person> Create(Person person, Guid? cityId);

        // Read
        Task<PersonWithCityVM> FindPerson(Guid id);
        Task<List<PersonWithCityVM>> AllPeople();

        // Update
        Task<Person> Edit(Person person, Guid? cityId);

        // Delete
        Task<bool> Delete(Guid id);
    }
}
