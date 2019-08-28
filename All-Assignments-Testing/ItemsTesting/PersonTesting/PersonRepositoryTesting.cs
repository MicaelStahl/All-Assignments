using All_Assignments.Interfaces.Assignment_10;
using All_Assignments.Models.Assignment10Models;
using All_Assignments.ViewModels;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace All_Assignments_Testing.ItemsTesting.PersonTesting
{
    public class PersonRepositoryTesting
    {
        #region D.I

        private readonly Mock<IPersonRepository> _service;

        public PersonRepositoryTesting()
        {
            _service = new Mock<IPersonRepository>();
        }

        #endregion

        #region References

        /// <summary>
        /// Returns one valid person without a city.
        /// </summary>
        private Person OneValidPersonWithoutCity()
        {
            return new Person
            {
                Id = new Guid(),
                FirstName = "Micael",
                LastName = "Ståhl",
                Age = 23,
                Email = "Micael_Stahl96@hotmail.com",
                Gender = "Male",
                PhoneNumber = "0725539574",
            };
        }

        /// <summary>
        /// Returns one valid person with a city.
        /// </summary>
        private Person OneValidPersonWithCity()
        {
            return new Person
            {
                Id = new Guid(),
                FirstName = "Micael",
                LastName = "Ståhl",
                Age = 23,
                Email = "Micael_Stahl96@hotmail.com",
                Gender = "Male",
                PhoneNumber = "0725539574",
                City = new City
                {
                    Id = new Guid(),
                    Name = "Vetlanda",
                    Population = "13578"
                }
            };
        }

        /// <summary>
        /// Returns a list of two people with cities.
        /// </summary>
        private List<PersonWithCityVM> TwoValidPeopleWithCities()
        {
            return new List<PersonWithCityVM>
            {
                new PersonWithCityVM
                {
                    CityId = new Guid(),
                    CityName = "Vetlanda",

                    Person = new Person
                    {
                        Id = new Guid(),
                        FirstName = "Micael",
                        LastName = "Ståhl",
                        Age = 23,
                        Email = "Micael_Stahl96@hotmail.com",
                        Gender = "Male",
                        PhoneNumber = "0725539574",
                    }
                },
                new PersonWithCityVM
                {
                    CityId = new Guid(),
                    CityName = "TestTown",

                    Person = new Person
                    {
                        Id = new Guid(),
                        FirstName = "Test",
                        LastName = "Testsson",
                        Age = 76,
                        Email = "TestTestsson@hotmail.com",
                        Gender = "Female",
                        PhoneNumber = "123456789",
                    }
                }
            };
        }

        /// <summary>
        /// Returns a list of two people without cities.
        /// </summary>
        private List<PersonWithCityVM> TwoValidPeopleWithoutCities()
        {
            return new List<PersonWithCityVM>
            {
                new PersonWithCityVM
                {
                    Person = new Person
                    {
                        Id = new Guid(),
                        FirstName = "Micael",
                        LastName = "Ståhl",
                        Age = 23,
                        Email = "Micael_Stahl96@hotmail.com",
                        Gender = "Male",
                        PhoneNumber = "0725539574",
                    }
                },
                new PersonWithCityVM
                {
                    Person = new Person
                    {
                        Id = new Guid(),
                        FirstName = "Test",
                        LastName = "Testsson",
                        Age = 76,
                        Email = "TestTestsson@hotmail.com",
                        Gender = "Female",
                        PhoneNumber = "123456789",
                    }
                }
            };
        }

        /// <summary>
        /// Returns a invalid person without a city.
        /// </summary>
        private Person InvalidPersonWithoutCity()
        {
            return new Person
            {
                Id = new Guid(),
                FirstName = "",
                LastName = "",
                Age = 15,
                Gender = "Male",
                PhoneNumber = "123456789",
                Email = "",
            };
        }

        /// <summary>
        /// Returns a invalid person with a city.
        /// </summary>
        private Person InvalidPersonWithCity()
        {
            return new Person
            {
                Id = new Guid(),
                FirstName = "",
                LastName = "",
                Age = 15,
                Gender = "Male",
                PhoneNumber = "123456789",
                Email = "",
                City = new City
                {
                    Id = new Guid(),
                    Name = "TestTown",
                    Population = "12355678",
                }
            };
        }

        #endregion

        #region Create

        #region ValidPerson

        [Fact]
        [Trait("PersonCreateNoCity", "Repository")]
        public async Task Create_CreateValidPersonWithoutCity_ReturnsCreatedPersonAsync()
        {
            var person = OneValidPersonWithoutCity();
            _service.Setup(x => x.Create(person, null)).ReturnsAsync(person);

            var result = await _service.Object.Create(person, null);

            Assert.Equal(person.FirstName, result.FirstName, false, false, false);
        }

        [Fact]
        [Trait("PersonCreateWithCity", "Repository")]
        public async Task Create_CreateValidPersonWithCity_ReturnsCreatedPersonAsync()
        {
            var person = OneValidPersonWithCity();
            _service.Setup(x => x.Create(person, person.City.Id)).ReturnsAsync(person);

            var result = await _service.Object.Create(person, person.City.Id);

            Assert.Equal(person.FirstName, result.FirstName, false, false, false);
        }

        [Fact]
        [Trait("PersonCreateTwoWithCity", "Repository")]
        public async Task Create_CreateTwoValidPeopleWithoutCities_ReturnsListOfTwoPeopleAsync()
        {
            var people = TwoValidPeopleWithoutCities();

            people.ForEach(x => _service.Setup(c => c.Create(x.Person, x.CityId)));
            _service.Setup(x => x.AllPeople()).Returns(Task.FromResult(people));

            var result = await _service.Object.AllPeople();

            Assert.Equal(people, result);
        }

        #endregion

        #endregion
    }
}
