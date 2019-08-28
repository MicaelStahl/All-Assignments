using All_Assignments.Interfaces.Assignment_10;
using All_Assignments.Models.Assignment10Models;
using All_Assignments.ViewModels;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
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
        /// Creates new Id's for all the other Reference Methods.
        /// </summary>
        private Guid IdGeneration()
        {
            return Guid.NewGuid();
        }

        /// <summary>
        /// Returns one valid person without a city.
        /// </summary>
        private Person OneValidPersonWithoutCity()
        {
            return new Person
            {
                Id = IdGeneration(),
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
                Id = IdGeneration(),
                FirstName = "Micael",
                LastName = "Ståhl",
                Age = 23,
                Email = "Micael_Stahl96@hotmail.com",
                Gender = "Male",
                PhoneNumber = "0725539574",
                City = new City
                {
                    Id = IdGeneration(),
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
                    CityId = IdGeneration(),
                    CityName = "Vetlanda",

                    Person = new Person
                    {
                        Id = IdGeneration(),
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
                    CityId = IdGeneration(),
                    CityName = "TestTown",

                    Person = new Person
                    {
                        Id = IdGeneration(),
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
                        Id = IdGeneration(),
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
                        Id = IdGeneration(),
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
        /// Returns one invalid person without a city.
        /// </summary>
        private Person OneInvalidPersonWithoutCity()
        {
            return new Person
            {
                Id = IdGeneration(),
                FirstName = "",
                LastName = "",
                Age = 15,
                Gender = "Male",
                PhoneNumber = "123456789",
                Email = "",
            };
        }

        /// <summary>
        /// Returns one invalid person with a city.
        /// </summary>
        private Person OneInvalidPersonWithCity()
        {
            return new Person
            {
                Id = IdGeneration(),
                FirstName = "",
                LastName = "",
                Age = 15,
                Gender = "Male",
                PhoneNumber = "123456789",
                Email = "",
                City = new City
                {
                    Id = IdGeneration(),
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
            _service.Setup(x => x.AllPeople()).ReturnsAsync(people);

            var result = await _service.Object.AllPeople();

            Assert.Equal(people, result);
        }

        [Fact]
        [Trait("PersonCreateTwoWithoutCity", "Repository")]
        public async Task Create_CreateTwoValidPeopleWIthCities_ReturnsListOfTwoPeopleAsync()
        {
            var people = TwoValidPeopleWithCities();

            people.ForEach(x => _service.Setup(c => c.Create(x.Person, x.CityId)));
            _service.Setup(x => x.AllPeople()).ReturnsAsync(people);

            var result = await _service.Object.AllPeople();

            Assert.Equal(people, result);
        }

        #endregion

        #region InvalidPerson

        [Fact]
        [Trait("PersonCreateInvalidPersonNoCity", "Repository")]
        public async Task Create_CreateOneInvalidPersonWithoutCity_ReturnsNullValueAsync()
        {
            _service.Setup(x => x.Create(OneInvalidPersonWithoutCity(), null)).Returns(Task.FromResult<Person>(null));

            var result = await _service.Object.Create(OneInvalidPersonWithoutCity(), null);

            Assert.Null(result);
        }

        [Fact]
        [Trait("PersonCreateInvalidPersonWithCity", "Repository")]
        public async Task Create_CreateOneInvalidPersonWithCity_ReturnsNullValueAsync()
        {
            var person = OneInvalidPersonWithCity();
            _service.Setup(x => x.Create(person, person.City.Id)).Returns(Task.FromResult<Person>(null));

            var result = await _service.Object.Create(person, person.City.Id);

            Assert.Null(result);
        }

        #endregion

        #endregion

        #region Read

        #region OnePerson

        [Fact]
        [Trait("PersonFindOneNoCity", "Repository")]
        public async Task Find_FindOnePersonNoCity_ReturnsCorrectPersonAsync()
        {
            var personOne = OneValidPersonWithCity();

            var person = new PersonWithCityVM { Person = OneValidPersonWithoutCity() };

            _service.Setup(x => x.Create(personOne, personOne.City.Id));
            _service.Setup(x => x.Create(person.Person, null));
            _service.Setup(x => x.FindPerson(person.Person.Id)).ReturnsAsync(person);

            var result = await _service.Object.FindPerson(person.Person.Id);

            Assert.Equal(person, result);
        }

        [Fact]
        [Trait("PersonFindOneWithCity", "Repository")]
        public async Task Find_FindOnePersonWithCity_ReturnsCorrectPersonAsync()
        {
            var personOne = OneValidPersonWithoutCity();

            var person = new PersonWithCityVM { Person = OneValidPersonWithCity() };

            _service.Setup(x => x.Create(personOne, null));
            _service.Setup(x => x.Create(person.Person, person.CityId));
            _service.Setup(x => x.FindPerson(person.Person.Id)).ReturnsAsync(person);

            var result = await _service.Object.FindPerson(person.Person.Id);

            Assert.Equal(person, result);
        }

        [Fact]
        [Trait("PersonFindOneInvalidNoCity", "Repository")]
        public async Task Find_FindOneInvalidPersonNoCity_ReturnsNullValueAsync()
        {
            var person = new PersonWithCityVM { Person = OneInvalidPersonWithoutCity() };
            _service.Setup(x => x.Create(person.Person, null));
            _service.Setup(x => x.FindPerson(person.Person.Id)).Returns(Task.FromResult<PersonWithCityVM>(null));

            var result = await _service.Object.FindPerson(person.Person.Id);

            Assert.Null(result);
        }

        [Fact]
        [Trait("PersonFindOneInvalidWithCity", "Repository")]
        public async Task Find_FindOneInvalidPersonWithCity_ReturnsNullValueAsync()
        {
            var person = new PersonWithCityVM { Person = OneInvalidPersonWithCity() };
            _service.Setup(x => x.Create(person.Person, person.CityId));
            _service.Setup(x => x.FindPerson(person.Person.Id)).Returns(Task.FromResult<PersonWithCityVM>(null));

            var result = await _service.Object.FindPerson(person.Person.Id);

            Assert.Null(result);
        }

        #endregion

        #region AllPeople

        [Fact]
        [Trait("PersonFindAllPeople", "Repository")]
        public async Task Find_FindAllPeople_ReturnsAllPeopleAsync()
        {
            var people = TwoValidPeopleWithCities();
            people.ForEach(x => _service.Setup(c => c.Create(x.Person, x.CityId)));
            _service.Setup(x => x.AllPeople()).ReturnsAsync(people);

            var result = await _service.Object.AllPeople();

            Assert.Equal(2, result.Count);
            Assert.Equal(people, result);
        }

        [Fact]
        [Trait("PersonFindAllPeople", "Repository")]
        public async Task Find_FindAllPeople_ReturnsNullIfListIsEmptyAsync()
        {
            _service.Setup(x => x.AllPeople()).Returns(Task.FromResult<List<PersonWithCityVM>>(null));

            var result = await _service.Object.AllPeople();

            Assert.Null(result);
        }

        #endregion

        #endregion

        #region Update

        #region UpdateValid

        [Fact]
        [Trait("PersonUpdateToValidNoCity", "Repository")]
        public async Task Update_UpdateToValidWithNoCity_ReturnsUpdatedPersonAsync()
        {
            var person = OneValidPersonWithoutCity();
            var editPerson = person;
            editPerson.FirstName = "Test";
            _service.Setup(x => x.Create(person, null));
            _service.Setup(x => x.Edit(editPerson, null)).ReturnsAsync(editPerson);

            var result = await _service.Object.Edit(editPerson, null);

            Assert.Equal(editPerson, result);
        }

        [Fact]
        [Trait("PersonUpdateToValidWithCity", "Repository")]
        public async Task Update_UpdateToValidWithCity_ReturnsUpdatedPersonAsync()
        {
            var person = OneValidPersonWithCity();
            var editPerson = person;
            editPerson.FirstName = "Test";
            _service.Setup(x => x.Create(person, person.City.Id));
            _service.Setup(x => x.Edit(editPerson, editPerson.City.Id)).ReturnsAsync(editPerson);

            var result = await _service.Object.Edit(editPerson, editPerson.City.Id);

            Assert.Equal(editPerson, result);
        }

        #endregion

        #region UpdateInvalid

        [Fact]
        [Trait("PersonUpdateToInvalidWithCity", "Repository")]
        public async Task Update_UpdateToInvalidWithCity_ReturnsNullValueAsync()
        {
            var person = OneValidPersonWithCity();
            var editPerson = person;
            editPerson.FirstName = "";
            _service.Setup(x => x.Create(person, person.City.Id));
            _service.Setup(x => x.Edit(editPerson, editPerson.City.Id)).Returns(Task.FromResult<Person>(null));

            var result = await _service.Object.Edit(editPerson, editPerson.City.Id);

            Assert.Null(result);
        }

        [Fact]
        [Trait("PersonUpdateToInvalidNoChange", "Repository")]
        public async Task Update_UpdateToInvalidWithCity_ReturnsNullValueAndDoesNotChangeOriginalPersonAsync()
        {
            var person = OneValidPersonWithCity();
            var personVM = new PersonWithCityVM { Person = person };
            var editPerson = person;
            editPerson.FirstName = "";
            _service.Setup(x => x.Create(person, person.City.Id));
            _service.Setup(x => x.Edit(editPerson, editPerson.City.Id)).Returns(Task.FromResult<Person>(null));
            _service.Setup(x => x.FindPerson(person.Id)).ReturnsAsync(personVM);

            var nullResult = await _service.Object.Edit(editPerson, editPerson.City.Id);
            var result = await _service.Object.FindPerson(person.Id);

            Assert.Null(nullResult);
            Assert.Equal(personVM, result);
        }

        #endregion

        #endregion

        #region Delete

        #region DeleteCorrect

        [Fact]
        [Trait("PersonDeleteCorrectPerson", "Repository")]
        public async Task Delete_DeleteCorrectPerson_ReturnsTrueValueAsync()
        {
            var people = TwoValidPeopleWithCities();
            people.ForEach(x => _service.Setup(c => c.Create(x.Person, x.CityId)));
            var person = people.SingleOrDefault(x => x.Person.FirstName == "Micael");
            _service.Setup(x => x.Delete(person.Person.Id)).ReturnsAsync(true);
            _service.Setup(x => x.AllPeople()).ReturnsAsync(people.Where(x=>x.Person.Id != person.Person.Id).ToList());

            var trueResult = await _service.Object.Delete(person.Person.Id);
            var result = await _service.Object.AllPeople();

            Assert.True(trueResult);
            Assert.Single(result);
        }

        #endregion

        #region DeleteWrongId

        [Fact]
        [Trait("PersonDeleteWrongId", "Repository")]
        public async Task Delete_DeleteWrongId_ReturnsFalseValueAsync()
        {
            var people = TwoValidPeopleWithCities();
            var fakeId = IdGeneration();
            people.ForEach(x => _service.Setup(c => c.Create(x.Person, x.CityId)));
            _service.Setup(x => x.Delete(fakeId)).Returns(Task.FromResult(false));
            _service.Setup(x => x.AllPeople()).ReturnsAsync(people);

            var falseResult = await _service.Object.Delete(fakeId);
            var result = await _service.Object.AllPeople();

            Assert.False(falseResult);
            Assert.Equal(2, result.Count);
        }

        #endregion

        #endregion
    }
}
