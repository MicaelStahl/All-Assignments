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

namespace All_Assignments_Testing.ItemsTesting.CityTesting
{
    public class CityRepositoryTesting
    {
        #region D.I

        private readonly Mock<ICityRepository> _service;

        public CityRepositoryTesting()
        {
            _service = new Mock<ICityRepository>();
        }

        #endregion

        #region References

        private Guid IdGeneration()
        {
            return Guid.NewGuid();
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
        [Trait("Repository", "CityCreateValidCity")]
        public async Task Create_ValidCityData_ReturnsNewlyCreatedCityAsync()
        {
            var city = OneValidCity();
            _service.Setup(x => x.Create(city, city.Country.Id)).ReturnsAsync(new CityWithCountryVM { City = city, CountryId = city.Country.Id, CountryName = city.Country.Name, People = city.People });

            var result = await _service.Object.Create(city, city.Country.Id);

            Assert.Equal(result.City, city);
            Assert.Equal(result.CountryId, city.Country.Id);
            Assert.Equal(result.CountryName, city.Country.Name);
        }

        [Fact]
        [Trait("Repository", "CityCreateInvalidCity")]
        public async Task Create_InvalidCityData_ReturnsNullValueAsync()
        {
            var city = OneInvalidCity();
            _service.Setup(x => x.Create(city, city.Country.Id)).Returns(Task.FromResult<CityWithCountryVM>(null));

            var result = await _service.Object.Create(city, city.Country.Id);

            Assert.Null(result);
        }

        #endregion

        #region Find

        #region FindOne

        [Fact]
        [Trait("Repository", "CityFindWithValidId")]
        public async Task Find_SubmitValidId_ReturnsCorrectPersonAsync()
        {
            var cities = TwoValidCities();
            var city = cities.LastOrDefault(); // Returns the 2nd value in the list.
            cities.ForEach(x => _service.Setup(c => c.Create(x, x.Country.Id)));
            _service.Setup(x => x.FindCity(city.Id)).ReturnsAsync(new CityWithCountryVM { City = city, CountryId = city.Country.Id, CountryName = city.Country.Name, People = city.People });

            var result = await _service.Object.FindCity(city.Id);

            Assert.Equal(city, result.City);
        }

        [Fact]
        [Trait("Repository", "CityFindWithInvalidId")]
        public async Task Find_SubmitInvalidId_ReturnsNullValueAsync()
        {
            var city = OneValidCity();
            var fakeId = IdGeneration();
            _service.Setup(x => x.Create(city, city.Country.Id));
            _service.Setup(x => x.FindCity(fakeId)).Returns(Task.FromResult<CityWithCountryVM>(null));

            var result = await _service.Object.FindCity(fakeId);

            Assert.Null(result);
        }

        #endregion

        #region FindForEdit

        [Fact]
        [Trait("Repository", "CityFindForEdit")]
        public async Task Find_SubmitValidIdForEdit_ReturnsCorrectCityAsync()
        {
            var cities = TwoValidCities();
            var city = cities.LastOrDefault();
            cities.ForEach(x => _service.Setup(c => c.Create(x, x.Country.Id)));
            _service.Setup(x => x.FindCityForEdit(city.Id)).ReturnsAsync(new CityEditVM { City = city, CountryId = city.Country.Id, CountryName = city.Country.Name, People = city.People });

            var result = await _service.Object.FindCityForEdit(city.Id);

            Assert.Equal(city, result.City);
        }

        [Fact]
        [Trait("Repository", "CityFindForEdit")]
        public async Task Find_SubmitInvalidIdForEdit_ReturnsNullValueAsync()
        {
            var cities = TwoValidCities();
            var fakeId = IdGeneration();
            cities.ForEach(x => _service.Setup(c => c.Create(x, x.Country.Id)));
            _service.Setup(x => x.FindCityForEdit(fakeId)).Returns(Task.FromResult<CityEditVM>(null));

            var result = await _service.Object.FindCityForEdit(fakeId);

            Assert.Null(result);
        }

        #endregion

        #region FindAll

        [Fact]
        [Trait("Repository", "CityFindAll")]
        public async Task Find_CallMethod_ReturnsListOfTwoCities()
        {
            var cities = TwoValidCities();
            cities.ForEach(x => _service.Setup(c => c.Create(x, x.Country.Id)));
            _service.Setup(x => x.AllCities()).ReturnsAsync(cities);

            var result = await _service.Object.AllCities();

            Assert.Equal(2, result.Count);
        }

        [Fact]
        [Trait("Repository", "CityFindAll")]
        public async Task Find_CallMethod_ReturnsNullIfListIsEmpty()
        {
            _service.Setup(x => x.AllCities()).Returns(Task.FromResult<List<City>>(null));

            var result = await _service.Object.AllCities();

            Assert.Null(result);
        }

        #endregion

        #region AllWithCountries

        [Fact]
        [Trait("Repository", "CityFindAllWithCountries")]
        public async Task Find_CallMethod_ReturnsListOfTwoCitiesWithCountries()
        {
            var cities = TwoValidCitiesWithCountries();
            cities.ForEach(x => _service.Setup(c => c.Create(x.City, x.CountryId)));
            _service.Setup(x => x.AllCitiesWithCountry()).ReturnsAsync(cities);

            var result = await _service.Object.AllCitiesWithCountry();

            Assert.Equal(2, result.Count);
        }

        [Fact]
        [Trait("Repository", "CityFindAllWithCountries")]
        public async Task Find_CallMethod_ReturnsNullValueIfListIsEmpty()
        {
            _service.Setup(x => x.AllCitiesWithCountry()).Returns(Task.FromResult<List<CityWithCountryVM>>(null));

            var result = await _service.Object.AllCitiesWithCountry();

            Assert.Null(result);
        }

        #endregion

        #endregion

        #region Edit

        #region EditCity

        [Fact]
        [Trait("Repository", "CityEditValidData")]
        public async Task Edit_SubmitValidEditData_ReturnsCorrectlyEditedCity()
        {
            var city = OneValidCity();
            var editCity = city;
            editCity.Name = "Stockholm";
            _service.Setup(x => x.Create(city, city.Country.Id));
            _service.Setup(x => x.Edit(editCity, editCity.Country.Id)).ReturnsAsync(editCity);

            var result = await _service.Object.Edit(editCity, editCity.Country.Id);

            Assert.Equal(editCity, result);
        }

        #endregion

        #endregion
    }
}
