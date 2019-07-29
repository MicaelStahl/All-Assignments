using All_Assignments.Models.Assignment10Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace All_Assignments.Interfaces.Assignment_10
{
    public interface IPersonRepository
    {
        // Create
        Task<Person> Create(Person person);

        // Read
        Task<Person> FindPerson(Guid id);
        Task<Person> FindPersonInCity(Guid id);
        Task<List<Person>> AllPeople();

        // Update
        Task<Person> Edit(Person person);

        // Delete
        Task<bool> Delete(Guid id);
    }
}
