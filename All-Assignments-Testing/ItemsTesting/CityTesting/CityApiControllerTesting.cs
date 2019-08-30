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

namespace All_Assignments_Testing.ItemsTesting.CityTesting
{
    public class CityApiControllerTesting
    {
        #region D.I

        private readonly Mock<ICityRepository> _service;
        private readonly CityApiController _controller;

        public CityApiControllerTesting()
        {
            _service = new Mock<ICityRepository>();
            _controller = new CityApiController(_service.Object);
        }

        #endregion

        #region References

        private Guid IdGeneration()
        {
            return Guid.NewGuid();
        }

        private List<Person> TwoPeople()
        {
            return new List<Person>
            {
                new Person
                {
                    Id = IdGeneration(),
                    FirstName = "Micael",
                    LastName = "Ståhl",
                    Age = 23,
                    Email = "Micael_Stahl96@hotmail.com",
                    Gender = "Male",
                    PhoneNumber = "0725539574",
                },
                new Person
                {
                    Id= IdGeneration(),
                    FirstName = "Test",
                    LastName = "Testsson",
                    Age = 24,
                    Email = "Test.Testsson@Testing.com",
                    Gender = "Apache",
                    PhoneNumber = "123456789"
                }
            };
        }

        private City OneValidCity()
        {
            return new City
            {
                Id = IdGeneration(),
                Name = "Vetlanda",
                Population = "13 587",
                Country = new Country
                {
                    Id = IdGeneration(),
                    Name = "Sweden",
                    Population = "10 258 423",
                },
                People = new List<Person>()
                {
                    new Person
                    {
                        Id = IdGeneration(),
                        FirstName = "Micael",
                        LastName = "Ståhl",
                        Age = 23,
                        Email = "Micael_Stahl96@hotmail.com",
                        Gender = "Male",
                        PhoneNumber = "0725539574",
                    },
                    new Person
                    {
                        Id = IdGeneration(),
                        FirstName = "Test",
                        LastName = "Testsson",
                        Age = 43,
                        Email = "Test.Testsson@Test.com",
                        Gender = "Apache",
                        PhoneNumber = "123456789",
                    }
                }
            };
        }

        private City OneInvalidCity()
        {
            return new City
            {
                Id = IdGeneration(),
                Name = "",
                Population = "13 587",
                Country = new Country
                {
                    Id = IdGeneration(),
                    Name = "Sweden",
                    Population = "10 258 423",
                },
                People = new List<Person>()
                {
                    new Person
                    {
                        Id = IdGeneration(),
                        FirstName = "Micael",
                        LastName = "Ståhl",
                        Age = 23,
                        Email = "Micael_Stahl96@hotmail.com",
                        Gender = "Male",
                        PhoneNumber = "0725539574",
                    },
                    new Person
                    {
                        Id = IdGeneration(),
                        FirstName = "Test",
                        LastName = "Testsson",
                        Age = 43,
                        Email = "Test.Testsson@Test.com",
                        Gender = "Apache",
                        PhoneNumber = "123456789",
                    }
                }
            };
        }

        private List<City> TwoValidCities()
        {
            return new List<City>()
            {
                new City
                {
                    Id = IdGeneration(),
                    Name = "Vetlanda",
                    Population = "13 587",
                    Country = new Country
                    {
                        Id = IdGeneration(),
                        Name = "Sweden",
                        Population = "10 258 423",
                    },
                    People = new List<Person>()
                    {
                        new Person
                        {
                            Id = IdGeneration(),
                            FirstName = "Micael",
                            LastName = "Ståhl",
                            Age = 23,
                            Email = "Micael_Stahl96@hotmail.com",
                            Gender = "Male",
                            PhoneNumber = "0725539574",
                        },
                        new Person
                        {
                            Id = IdGeneration(),
                            FirstName = "Test",
                            LastName = "Testsson",
                            Age = 43,
                            Email = "Test.Testsson@Test.com",
                            Gender = "Apache",
                            PhoneNumber = "123456789",
                        }
                    }
                },
                new City
                {
                    Id = IdGeneration(),
                    Name = "Växjö",
                    Population = "33 874",
                    Country = new Country
                    {
                        Id = IdGeneration(),
                        Name = "Sweden",
                        Population = "10 258 423",
                    },
                    People = new List<Person>()
                    {
                        new Person
                        {
                            Id = IdGeneration(),
                            FirstName = "Micael",
                            LastName = "Ståhl",
                            Age = 23,
                            Email = "Micael_Stahl96@hotmail.com",
                            Gender = "Male",
                            PhoneNumber = "0725539574",
                        },
                        new Person
                        {
                            Id = IdGeneration(),
                            FirstName = "Test",
                            LastName = "Testsson",
                            Age = 43,
                            Email = "Test.Testsson@Test.com",
                            Gender = "Apache",
                            PhoneNumber = "123456789",
                        }
                    }
                }
            };
        }

        private List<CityWithCountryVM> TwoValidCitiesWithCountries()
        {
            var city = new CityWithCountryVM
            {
                City = OneValidCity(),
            };
            return new List<CityWithCountryVM>()
            {
                new CityWithCountryVM
                {
                    City = city.City,
                    CountryId = city.CountryId,
                    CountryName = city.CountryName,
                    People = city.People
                },
                new CityWithCountryVM
                {
                    City = new City
                    {
                        Name = "TestTown",
                        Population = "12 345",
                    },
                     CountryId = city.CountryId,
                     CountryName = city.CountryName,
                     People = city.People
                }
            };
        }

        #endregion

        #region Create

        [Fact]
        [Trait("Category", "CityCreateValidModelState")]
        public async Task Create_ValidModelState_ReturnsOkResultAndCreatedCity()
        {
            var city = OneValidCity();
            _service.Setup(x => x.Create(city, city.Country.Id)).ReturnsAsync(new CityWithCountryVM { City = city, CountryId = city.Country.Id, CountryName = city.Country.Name, People = city.People });

            var result = await _controller.Create(new CityWithCountryIdVM { City = city, CountryId = city.Country.Id });

            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<CityWithCountryVM>(okResult.Value);
            Assert.Equal(city, model.City);
            Assert.Equal(city.Country.Id, model.CountryId);
            Assert.Equal(city.Country.Name, model.CountryName);
            Assert.Equal(city.People, model.People);
        }

        /// <summary>
        /// This test is only to test the repository if the modelState somehow would fail.
        /// </summary>
        [Fact]
        [Trait("Category", "CityCreateValidModelState")]
        public async Task Create_ValidModelState_ReturnsBadRequestObjectResult()
        {
            var city = OneInvalidCity();
            _service.Setup(x => x.Create(city, city.Country.Id)).Returns(Task.FromResult<CityWithCountryVM>(null));

            var result = await _controller.Create(new CityWithCountryIdVM { City = city, CountryId = city.Country.Id });

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        [Trait("Category", "CityCreateInvalidModelState")]
        public async Task Create_InvalidModelState_ReturnsBadRequestObjectResult()
        {
            var city = OneInvalidCity();
            _service.Setup(x => x.Create(city, city.Country.Id)).Returns(Task.FromResult<CityWithCountryVM>(null));
            _controller.ModelState.AddModelError("Invalid input", "Invalid inputs given");

            var result = await _controller.Create(new CityWithCountryIdVM { City = city, CountryId = city.Country.Id });

            Assert.IsType<BadRequestObjectResult>(result);
        }

        #endregion

        #region Find

        #region FindOne

        [Fact]
        [Trait("Category", "CityGetOneCity")]
        public async Task Find_SubmitValidId_ReturnsOkResultAndCorrectCity()
        {
            var cities = TwoValidCities();
            var city = cities.LastOrDefault();
            cities.ForEach(x => _service.Setup(c => c.Create(x, x.Country.Id)));
            _service.Setup(x => x.FindCity(city.Id)).ReturnsAsync(new CityWithCountryVM { City = city, CountryId = city.Country.Id, CountryName = city.Country.Name, People = city.People });

            var result = await _controller.Get(city.Id);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<CityWithCountryVM>(okResult.Value);
            Assert.Equal(city, model.City);
            Assert.Equal(city.Country.Id, model.CountryId);
            Assert.Equal(city.Country.Name, model.CountryName);
            Assert.Equal(city.People, model.People);
        }

        [Fact]
        [Trait("Category", "CityGetOneCity")]
        public async Task Find_SubmitInvalidId_ReturnsBadRequestResult()
        {
            var cities = TwoValidCities();
            var fakeId = IdGeneration();
            cities.ForEach(x => _service.Setup(c => c.Create(x, x.Country.Id)));
            _service.Setup(x => x.FindCity(fakeId)).Returns(Task.FromResult<CityWithCountryVM>(null));

            var result = await _controller.Get(fakeId);

            Assert.IsType<BadRequestResult>(result);
        }

        #endregion

        #region FindAll

        [Fact]
        [Trait("Category", "CityFindAllCities")]
        public async Task Find_CallMethod_ReturnsOkResultAndListOfCities()
        {
            var cities = TwoValidCities();
            cities.ForEach(x => _service.Setup(c => c.Create(x, x.Country.Id)));
            _service.Setup(x => x.AllCities()).ReturnsAsync(cities);

            var result = await _controller.GetAll();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<List<City>>(okResult.Value);
            Assert.Equal(cities, model);
        }

        [Fact]
        [Trait("Category", "CityFindAllCities")]
        public async Task Find_CallMethod_ReturnsBadRequestIfNoCitiesExists()
        {
            _service.Setup(x => x.AllCities()).Returns(Task.FromResult<List<City>>(null));

            var result = await _controller.GetAll();

            Assert.IsType<BadRequestResult>(result);
        }

        #endregion

        #region FindAllWithCountries

        [Fact]
        [Trait("Category", "CityFindAllWithCountries")]
        public async Task Find_CallMethod_ReturnsOkResultAndListOfCitiesWithCountries()
        {
            var citiesVM = new List<CityWithCountryVM>();
            var cities = TwoValidCities();
            cities.ForEach(x => citiesVM.Add(new CityWithCountryVM { City = x, CountryId = x.Country.Id, CountryName = x.Country.Name, People = x.People }));
            cities.ForEach(x => _service.Setup(c => c.Create(x, x.Country.Id)));
            _service.Setup(x => x.AllCitiesWithCountry()).ReturnsAsync(citiesVM);

            var result = await _controller.GetAllCities();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<List<CityWithCountryVM>>(okResult.Value);
            Assert.Equal(citiesVM, model);
        }

        [Fact]
        [Trait("Category", "CityFindAllWithCountries")]
        public async Task Find_CallMethod_ReturnsBadRequestIfListIsEmpty()
        {
            _service.Setup(x => x.AllCitiesWithCountry()).Returns(Task.FromResult<List<CityWithCountryVM>>(null));

            var result = await _controller.GetAllCities();

            Assert.IsType<BadRequestResult>(result);
        }

        #endregion

        #region FindCityForEdit

        [Fact]
        [Trait("Category", "CityFindForEdit")]
        public async Task Find_SubmitValidId_ReturnsOkObjectResultAndCorrectCity()
        {
            var cities = TwoValidCities();
            var city = cities.LastOrDefault();
            cities.ForEach(x => _service.Setup(c => c.Create(x, x.Country.Id)));
            _service.Setup(x => x.FindCityForEdit(city.Id)).ReturnsAsync(new CityEditVM { City = city, CountryId = city.Country.Id, CountryName = city.Country.Name, People = city.People });

            var result = await _controller.GetCityForEdit(city.Id);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<CityEditVM>(okResult.Value);
            Assert.Equal(city, model.City);
        }

        [Fact]
        [Trait("Category", "CityFindForEdit")]
        public async Task Find_SubmitInvalidId_ReturnsBadRequestResultAsync()
        {
            var cities = TwoValidCities();
            var fakeId = IdGeneration();
            cities.ForEach(x => _service.Setup(c => c.Create(x, x.Country.Id)));
            _service.Setup(x => x.FindCityForEdit(fakeId)).Returns(Task.FromResult<CityEditVM>(null));

            var result = await _controller.GetCityForEdit(fakeId);

            Assert.IsType<BadRequestResult>(result);
        }

        #endregion

        #endregion

        #region Update

        #region UpdateCity

        [Fact]
        [Trait("Category", "CityEditValidModelState")]
        public async Task Edit_SubmitWithValidModelState_ReturnsOkResultAndUpdatedCity()
        {
            var city = OneValidCity();
            var editCity = city;
            editCity.Name = "Jönssonligan";
            _service.Setup(x => x.Create(city, city.Country.Id));
            _service.Setup(x => x.Edit(editCity, editCity.Country.Id)).ReturnsAsync(editCity);

            var result = await _controller.Edit(new CityWithCountryIdVM { City = editCity, CountryId = editCity.Country.Id });

            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<City>(okResult.Value);
            Assert.Equal(editCity, model);
        }

        [Fact]
        [Trait("Category", "CityEditValidModelState")]
        public async Task Edit_SubmitInvalidDataWithValidModelState_ReturnsbadRequest()
        {
            var city = OneValidCity();
            var editCity = city;
            editCity.Name = "";
            _service.Setup(x => x.Create(city, city.Country.Id));
            _service.Setup(x => x.Edit(editCity, editCity.Country.Id)).Returns(Task.FromResult<City>(null));

            var result = await _controller.Edit(new CityWithCountryIdVM { City = editCity, CountryId = editCity.Country.Id });

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        [Trait("Category", "CityEditInvalidModelState")]
        public async Task Edit_SubmitInvalidDataWithInvalidModelState_ReturnsBadRequestObjectResult()
        {
            var city = OneValidCity();
            var editCity = city;
            editCity.Name = "";
            _controller.ModelState.AddModelError("Invalid input", "Invalid inputs.");
            _service.Setup(x => x.Create(city, city.Country.Id));
            _service.Setup(x => x.Edit(editCity, editCity.Country.Id)).Returns(Task.FromResult<City>(null));

            var result = await _controller.Edit(new CityWithCountryIdVM { City = city, CountryId = city.Country.Id });

            Assert.IsType<BadRequestObjectResult>(result);
        }

        #endregion

        #region AddPeople

        [Fact]
        [Trait("Category", "EditAddPeople")]
        public async Task Edit_SubmitTwoPeopleWithCity_ReturnsOkObjectResultAndCorrectCity()
        {
            var people = TwoPeople();
            var city = OneValidCity();
            city.People = new List<Person>();
            _service.Setup(x => x.Create(city, city.Country.Id));
            _service.Setup(x => x.AddPeople(city.Id, people)).ReturnsAsync(new City { Name = city.Name, Population = city.Population, Id = city.Id, People = people, Country = city.Country });

            var result = await _controller.AddPeople(city.Id, people);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<City>(okResult.Value);
            Assert.Equal(2, model.People.Count);
        }

        [Fact]
        [Trait("Category", "EditAddPeople")]
        public async Task Edit_SubmitTwoPeopleInvalidId_ReturnsBadRequestResultAndNoUpdateOnCity()
        {
            var people = TwoPeople();
            var city = OneValidCity();
            city.People = new List<Person>();
            var fakeId = IdGeneration();
            _service.Setup(x => x.Create(city, city.Country.Id));
            _service.Setup(x => x.AddPeople(fakeId, people)).Returns(Task.FromResult<City>(null));
            _service.Setup(x => x.FindCity(city.Id)).ReturnsAsync(new CityWithCountryVM { City = city });

            var result = await _controller.AddPeople(fakeId, people);
            var sameCity = await _controller.Get(city.Id);

            Assert.IsType<BadRequestObjectResult>(result);
            var okResult = Assert.IsType<OkObjectResult>(sameCity);
            var model = Assert.IsAssignableFrom<CityWithCountryVM>(okResult.Value);
            Assert.Equal(city, model.City);
        }

        [Fact]
        [Trait("Category", "EditAddPeople")]
        public async Task Edit_SubmitNoPeopleValidId_ReturnsBadRequestResultAndCityWithNoPeople()
        {
            var city = OneValidCity();
            city.People = new List<Person>();
            _service.Setup(x => x.Create(city, city.Country.Id));
            _service.Setup(x => x.AddPeople(city.Id, null)).ReturnsAsync(city);
            _service.Setup(x => x.FindCity(city.Id)).ReturnsAsync(new CityWithCountryVM { City = city, CountryId = city.Country.Id, CountryName = city.Country.Name, People = city.People });

            var result = await _controller.AddPeople(city.Id, null);
            var sameCity = await _controller.Get(city.Id);

            Assert.IsType<BadRequestResult>(result);
            var okResult = Assert.IsType<OkObjectResult>(sameCity);
            var model = Assert.IsAssignableFrom<CityWithCountryVM>(okResult.Value);
            Assert.Equal(city.People, model.People);
        }

        #endregion

        #endregion

        #region Delete

        #region Success

        [Fact]
        [Trait("Category", "CityDeleteValidId")]
        public async Task Delete_SubmitValidId_ReturnsOkObjectResult()
        {
            var cities = TwoValidCities();
            var city = cities.LastOrDefault();
            cities.ForEach(x => _service.Setup(c => c.Create(x, x.Country.Id)));
            _service.Setup(x => x.Delete(city.Id)).ReturnsAsync(true);

            var result = await _controller.Delete(city.Id);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<bool>(okResult.Value);
            Assert.True(model);
        }

        #endregion

        #region Failed

        [Fact]
        [Trait("Category", "CityDeleteInvalidId")]
        public async Task Delete_SubmitInvalidId_ReturnsBadRequestObjectResult()
        {
            var cities = TwoValidCities();
            var fakeId = IdGeneration();
            cities.ForEach(x => _service.Setup(c => c.Create(x, x.Country.Id)));
            _service.Setup(x => x.Delete(fakeId)).Returns(Task.FromResult(false));

            var result = await _controller.Delete(fakeId);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        [Trait("Category", "CityDeleteEmptyId")]
        public async Task Delete_SubmitEmptyId_ReturnsBadRequestResult()
        {
            var cities = TwoValidCities();
            cities.ForEach(x => _service.Setup(c => c.Create(x, x.Country.Id)));

            var result = await _controller.Delete(Guid.Empty);

            Assert.IsType<BadRequestResult>(result);
        }

        #endregion

        #endregion
    }
}
