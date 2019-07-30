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
    public class PersonRepository : IPersonRepository
    {
        #region D.I
        private readonly AllAssignmentsDbContext _db;

        public PersonRepository(AllAssignmentsDbContext db)
        {
            _db = db;
        }
        #endregion

        #region Create
        public async Task<Person> Create(Person person)
        {
            if (string.IsNullOrWhiteSpace(person.FirstName) || string.IsNullOrWhiteSpace(person.LastName) || string.IsNullOrWhiteSpace(person.Email) || string.IsNullOrWhiteSpace(person.Gender) || string.IsNullOrWhiteSpace(person.PhoneNumber))
            {
                return null;
            }

            var newPerson = new Person()
            {
                FirstName = person.FirstName,
                LastName = person.LastName,
                Age = person.Age,
                Email = person.Email,
                PhoneNumber = person.PhoneNumber,
                Gender = person.Gender,
                City = person.City
            };

            if (newPerson == null)
            {
                return null;
            }

            await _db.People.AddAsync(newPerson);

            await _db.SaveChangesAsync();

            return newPerson;
        }
        #endregion

        #region Read
        public async Task<Person> FindPerson(Guid id)
        {
            if (id == null || string.IsNullOrWhiteSpace(id.ToString()))
            {
                return null;
            }

            var person = await _db.People.SingleOrDefaultAsync(x => x.Id == id);

            if (person == null)
            {
                return null;
            }
            return person;
        }

        public async Task<Person> FindPersonInCity(Guid id)
        {
            if (id == null || string.IsNullOrWhiteSpace(id.ToString()))
            {
                return null;
            }

            var person = await _db.People.Include(x => x.City).ThenInclude(x=>x.Country).SingleOrDefaultAsync(x => x.Id == id);

            if (person == null)
            {
                return null;
            }
            return person;
        }

        public async Task<List<Person>> AllPeople()
        {
            var people = await _db.People
                .Include(x => x.City.Name)
                .ToListAsync();

            if (people == null || people.Count == 0)
            {
                return null;
            }
            return people;
        }
        #endregion

        #region Update
        public async Task<Person> Edit(Person person)
        {
            if (string.IsNullOrWhiteSpace(person.FirstName) || string.IsNullOrWhiteSpace(person.LastName) || string.IsNullOrWhiteSpace(person.Email) || string.IsNullOrWhiteSpace(person.Gender) || string.IsNullOrWhiteSpace(person.PhoneNumber))
            {
                return null;
            }

            var original = await _db.People.SingleOrDefaultAsync(x => x.Id == person.Id);

            if (original == null)
            {
                return null;
            }

            original.FirstName = person.FirstName;
            original.LastName = person.LastName;
            original.Age = person.Age;
            original.Email = person.Email;
            original.PhoneNumber = person.PhoneNumber;
            original.Gender = person.Gender;
            original.City = person.City;

            await _db.SaveChangesAsync(true);

            return original;
        }
        #endregion

        #region Delete
        public async Task<bool> Delete(Guid id)
        {
            if (id == null || string.IsNullOrWhiteSpace(id.ToString()))
            {
                return false;
            }

            var person = await _db.People.SingleOrDefaultAsync(x => x.Id == id);

            if (person == null)
            {
                return false;
            }

            var result = _db.People.Remove(person);

            await _db.SaveChangesAsync();

            var verify = await _db.People.SingleOrDefaultAsync(x => x.Id == id);

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
