using All_Assignments.Controllers;
using All_Assignments.Interfaces.Assignment_10;
using All_Assignments.Models.Assignment10Models;
using All_Assignments.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace All_Assignments_Testing.ItemsTesting.PersonTesting
{
    public class PersonApiControllerTesting
    {
        #region D.I

        private readonly Mock<IPersonRepository> _service;
        private readonly PersonAPIController _controller;

        public PersonApiControllerTesting()
        {
            _service = new Mock<IPersonRepository>();
            _controller = new PersonAPIController(_service.Object);
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

        [Fact]
        [Trait("Category", "PersonApiCreate")]
        public async Task Create_ValidModelState_ReturnsRedirectToActionResult()
        {
            var person = OneValidPersonWithCity();
            _service.Setup(x => x.Create(person, person.City.Id)).ReturnsAsync(person);

            var result = await _controller.Create(new PersonWithCityIdVM { Person = person, CityId = person.City.Id });

            Assert.IsType<RedirectToActionResult>(result);
        }

        [Fact]
        [Trait("Category", "PersonApiCreate")]
        public async Task Create_InvalidModelState_ReturnsBadRequestObjectResult()
        {
            var person = OneInvalidPersonWithCity();
            _service.Setup(x => x.Create(person, person.City.Id)).Returns(Task.FromResult<Person>(null));
            _controller.ModelState.AddModelError("Invalid inputs", "Invalid inputs were given");

            var result = await _controller.Create(new PersonWithCityIdVM { Person = person, CityId = person.City.Id });

            Assert.IsType<BadRequestObjectResult>(result);
        }

        #endregion

        #region Find

        #region FindOne

        [Fact]
        [Trait("Category", "PersonApiFindOne")]
        public async Task Find_SubmitValidId_ReturnsCorrectPersonAndOkObjectResultWith200Status()
        {
            var person = OneValidPersonWithCity();
            var personVM = new PersonWithCityVM { CityId = person.City.Id, CityName = person.City.Name, Person = person };
            _service.Setup(x => x.Create(person, person.City.Id));
            _service.Setup(x => x.FindPerson(person.Id)).ReturnsAsync(personVM);

            var result = await _controller.Get(person.Id);

            var viewResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<PersonWithCityVM>(viewResult.Value);
            Assert.Equal(200, viewResult.StatusCode);
            Assert.Equal(personVM, model);
        }

        [Fact]
        [Trait("Category", "PersonApiFindOne")]
        public async Task Find_SubmitInvalidId_ReturnsNotFoundResult()
        {
            var person = OneValidPersonWithCity();
            var fakeId = IdGeneration();
            _service.Setup(x => x.Create(person, person.City.Id));
            _service.Setup(x => x.FindPerson(fakeId)).Returns(Task.FromResult<PersonWithCityVM>(null));

            var result = await _controller.Get(fakeId);

            var notFound = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Contains("Not be found".ToLower(), notFound.Value.ToString().ToLower());
        }

        #endregion

        #region FindALl

        [Fact]
        [Trait("Category", "PersonApiFindAll")]
        public async Task Find_CallMethod_ReturnsOkObjectResultAndListOfTwoPeople()
        {
            var people = TwoValidPeopleWithCities();
            people.ForEach(x => _service.Setup(c => c.Create(x.Person, x.CityId)));
            _service.Setup(x => x.AllPeople()).ReturnsAsync(people);

            var result = await _controller.GetAll();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<List<PersonWithCityVM>>(okResult.Value);
            Assert.Equal(200, okResult.StatusCode);
            Assert.Equal(2, model.Count);
        }

        [Fact]
        [Trait("Category", "PersonApiFindAll")]
        public async Task Find_CallMethod_ReturnsNotFoundResultIfListIsNull()
        {
            var people = TwoValidPeopleWithCities();
            people.ForEach(x => _service.Setup(c => c.Create(x.Person, x.CityId)));
            _service.Setup(x => x.AllPeople()).Returns(Task.FromResult<List<PersonWithCityVM>>(null));

            var result = await _controller.GetAll();

            Assert.IsType<NotFoundObjectResult>(result);
        }

        #endregion

        #endregion

        #region Update

        #region EditSuccess

        [Fact]
        [Trait("Category", "PersonUpdateValidModelState")]
        public async Task Update_UpdateWithValidModelState_ReturnsOkResultAndUpdatedPerson()
        {
            var person = OneValidPersonWithCity();
            var editPerson = new PersonWithCityVM { Person = person, CityId = person.City.Id, CityName = person.City.Name };
            // Originally "Micael"
            editPerson.Person.FirstName = "Test";
            _service.Setup(x => x.Create(person, person.City.Id));
            _service.Setup(x => x.Edit(editPerson.Person, editPerson.CityId)).ReturnsAsync(editPerson.Person);

            var result = await _controller.Edit(editPerson);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<PersonWithCityVM>(okResult.Value);
            Assert.Equal(editPerson.Person, model.Person);
        }

        #endregion

        #region EditFailed

        [Fact]
        [Trait("Category", "PersonUpdateInvalidModelState")]
        public async Task Update_UpdateWithInVaalidModelState_ReturnsBadRequestObjectResult()
        {
            var person = OneValidPersonWithCity();
            var editPerson = new PersonWithCityVM { Person = person, CityId = person.City.Id, CityName = person.City.Name };
            editPerson.Person.FirstName = "";
            _service.Setup(x => x.Create(person, person.City.Id));
            _service.Setup(x => x.Edit(editPerson.Person, editPerson.CityId)).Returns(Task.FromResult<Person>(null));
            _controller.ModelState.AddModelError("Invalid FirstName", "Invalid FirstName given");

            var result = await _controller.Edit(editPerson);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        #endregion

        #endregion

        #region Delete

        #region DeleteSuccess

        [Fact]
        [Trait("Category", "PersonDeleteValidId")]
        public async Task Delete_DeleteWithValidId_ReturnsOkObjectResult()
        {
            var person = OneValidPersonWithCity();
            _service.Setup(x => x.Create(person, person.City.Id));
            _service.Setup(x => x.Delete(person.Id)).ReturnsAsync(true);

            var result = await _controller.Delete(person.Id);

            var okResult = Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        [Trait("Category", "PersonDeleteValidId")]
        public async Task Delete_DeleteCorrectPerson_ReturnsListOfOnePerson()
        {
            var people = TwoValidPeopleWithCities();
            var person = people.SingleOrDefault(x => x.Person.FirstName == "Micael");
            people.ForEach(x => _service.Setup(c => c.Create(x.Person, x.CityId)));
            _service.Setup(x => x.Delete(person.Person.Id)).ReturnsAsync(true);
            _service.Setup(x => x.AllPeople()).ReturnsAsync(people.Where(x => x.Person.Id != person.Person.Id).ToList());

            var deleteResult = await _controller.Delete(person.Person.Id);
            var result = await _controller.GetAll();

            Assert.IsType<OkObjectResult>(deleteResult);
            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<List<PersonWithCityVM>>(okObjectResult.Value);
            Assert.Single(model);
        }

        #endregion

        #region DeleteFailed

        [Fact]
        [Trait("Category", "PersonDeleteInvalidId")]
        public async Task Delete_DeleteWithInValidId_ReturnsBadRequestObjectResult()
        {
            var person = OneValidPersonWithCity();
            var fakeId = IdGeneration();
            _service.Setup(x => x.Create(person, person.City.Id));
            _service.Setup(x => x.Delete(fakeId)).Returns(Task.FromResult(false));

            var result = await _controller.Delete(fakeId);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        [Trait("Category", "PersonDeleteInvalidId")]
        public async Task Delete_DeleteWithInValidId_ReturnsNoDeletedPeople()
        {
            var people = TwoValidPeopleWithCities();
            var fakeId = IdGeneration();
            people.ForEach(x => _service.Setup(c => c.Create(x.Person, x.CityId)));
            _service.Setup(x => x.Delete(fakeId)).Returns(Task.FromResult(false));
            _service.Setup(x => x.AllPeople()).ReturnsAsync(people);

            var falseResult = await _controller.Delete(fakeId);
            var result = await _controller.GetAll();

            Assert.IsType<BadRequestObjectResult>(falseResult);
            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<List<PersonWithCityVM>>(okObjectResult.Value);
            Assert.Equal(2, model.Count);
        }

        #endregion

        #endregion
    }
}
