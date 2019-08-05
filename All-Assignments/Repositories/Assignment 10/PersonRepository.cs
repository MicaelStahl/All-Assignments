using All_Assignments.Database;
using All_Assignments.Interfaces.Assignment_10;
using All_Assignments.Models.Assignment10Models;
using All_Assignments.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
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
        public async Task<Person> Create(Person person, Guid? cityId)
        {
            if (string.IsNullOrWhiteSpace(person.FirstName) ||
                string.IsNullOrWhiteSpace(person.LastName) ||
                string.IsNullOrWhiteSpace(person.Email) ||
                string.IsNullOrWhiteSpace(person.Gender) ||
                string.IsNullOrWhiteSpace(person.PhoneNumber))
            {
                return null;
            }

            City city = new City();

            city = null;

            // Checks if the user picked a city when creating a person. If the user did, then it'll try to
            // Find the chosen city, if the city doesn't exist however, it returns a null.
            if (cityId != null)
            {
                city = await _db.Cities.SingleOrDefaultAsync(x => x.Id == cityId);

                if (city == null)
                {
                    return null;
                }
            }

            var newPerson = new Person()
            {
                FirstName = person.FirstName,
                LastName = person.LastName,
                Age = person.Age,
                Email = person.Email,
                PhoneNumber = person.PhoneNumber,
                Gender = person.Gender,
                City = city
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
        public async Task<PersonWithCityVM> FindPerson(Guid id)
        {
            if (id == null || string.IsNullOrWhiteSpace(id.ToString()))
            {
                return null;
            }

            var person = await _db.People
                .Include(x => x.City)
                .SingleOrDefaultAsync(x => x.Id == id);

            PersonWithCityVM personVM = new PersonWithCityVM
            {
                CityName = person.City?.Name,
                CityId = person.City?.Id
            };
            person.City = null;
            personVM.Person = person;

            if (person == null)
            {
                return null;
            }
            return personVM;
        }

        public async Task<List<PersonWithCityVM>> AllPeople()
        {
            var people = await _db.People
                .Include(x => x.City)
                .ToListAsync();


            if (people == null || people.Count == 0)
            {
                return null;
            }

            List<PersonWithCityVM> peopleVM = new List<PersonWithCityVM>();

            foreach (var item in people)
            {
                PersonWithCityVM personVM = new PersonWithCityVM
                {
                    CityName = item.City?.Name ?? "Homeless",
                    CityId = item.City?.Id ?? null
                };
                item.City = null;
                personVM.Person = item;
                peopleVM.Add(personVM);
            }

            return peopleVM;
        }
        #endregion

        #region Update
        public async Task<Person> Edit(Person person, Guid? cityId)
        {
            if (string.IsNullOrWhiteSpace(person.FirstName) || string.IsNullOrWhiteSpace(person.LastName) || string.IsNullOrWhiteSpace(person.Email) || string.IsNullOrWhiteSpace(person.Gender) || string.IsNullOrWhiteSpace(person.PhoneNumber))
            {
                return null;
            }

            var original = await _db.People.SingleOrDefaultAsync(x => x.Id == person.Id);

            City city = new City();

            city = null;

            // Checks if the user picked a city when creating a person. If the user did, then it'll try to
            // Find the chosen city, if the city doesn't exist however, it returns a null.
            if (cityId != null)
            {
                city = await _db.Cities.SingleOrDefaultAsync(x => x.Id == cityId);

                if (city == null)
                {
                    return null;
                }
            }

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
            original.City = city;

            await _db.SaveChangesAsync();

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
