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

namespace All_Assignments_Testing.ItemsTesting.CountryTesting
{
    public class CountryRepositoryTesting
    {
        #region D.I

        private readonly Mock<ICountryRepository> _service;

        public CountryRepositoryTesting()
        {
            _service = new Mock<ICountryRepository>();
        }

        #endregion

        #region References

        private Guid IdGeneration()
        {
            return Guid.NewGuid();
        }

        private Country OneValidCountry()
        {
            return new Country
            {
                Id = IdGeneration(),
                Name = "Sweden",
                Population = "10524874",
            };
        }
        private Country OneInvalidCountry()
        {
            return new Country
            {
                Id = IdGeneration(),
                Name = "",
                Population = ""
            };
        }

        private List<Country> TwoValidCountries()
        {
            return new List<Country>
            {
                new Country
                {
                    Id = IdGeneration(),
                    Name = "Sweden",
                    Population = "10524874"
                },
                new Country
                {
                    Id = IdGeneration(),
                    Name = "Denmark",
                    Population = "5587452"
                }
            };
        }

        private List<City> TwoCities()
        {
            return new List<City>
            {
                new City
                {
                    Id = IdGeneration(),
                    Name = "Vetlanda",
                    Population = "13547"
                },
                new City
                {
                    Id = IdGeneration(),
                    Name = "Växjö",
                    Population = "33458"
                }
            };
        }

        #endregion

        #region Create

        #region Success

        [Fact]
        [Trait("Repository", "CountryCreateValidData")]
        public async Task Create_CreateWithValidData_ReturnsNewlyCreatedCountry()
        {
            var country = OneValidCountry();
            _service.Setup(x => x.Create(country)).ReturnsAsync(country);

            var result = await _service.Object.Create(country);

            Assert.Equal(country, result);
        }

        #endregion

        #region Failed

        [Fact]
        [Trait("Repository", "CountryCreateWithInvalidData")]
        public async Task Create_CreateWithInvalidData_ReturnsNullValue()
        {
            var country = OneInvalidCountry();
            _service.Setup(x => x.Create(country)).Returns(Task.FromResult<Country>(null));

            var result = await _service.Object.Create(country);

            Assert.Null(result);
        }

        #endregion

        #endregion

        #region Find

        #region FindCountry

        [Fact]
        [Trait("Repository", "CountryFindOneCountry")]
        public async Task Find_SubmitValidId_ReturnsCorrectCountry()
        {
            var countries = TwoValidCountries();
            var country = countries.LastOrDefault();
            countries.ForEach(x => _service.Setup(c => c.Create(x)));
            _service.Setup(x => x.FindCountry(country.Id)).ReturnsAsync(new CountryWithCitiesVM { Country = country, Cities = country.Cities });

            var result = await _service.Object.FindCountry(country.Id);

            Assert.Equal(country, result.Country);
        }

        [Fact]
        [Trait("Repository", "CountryFindOneCountry")]
        public async Task Find_SubmitInvalidId_ReturnsNullValue()
        {
            var countries = TwoValidCountries();
            var fakeId = IdGeneration();
            countries.ForEach(x => _service.Setup(c => c.Create(x)));
            _service.Setup(x => x.FindCountry(fakeId)).Returns(Task.FromResult<CountryWithCitiesVM>(null));

            var result = await _service.Object.FindCountry(fakeId);

            Assert.Null(result);
        }

        #endregion

        #region FindCountries

        [Fact]
        [Trait("Repository", "CountryFindAllCountries")]
        public async Task Find_CallMethod_ReturnsListOfTwoCountries()
        {
            var countriesVM = new List<CountryWithCitiesVM>();
            var countries = TwoValidCountries();
            countries.ForEach(x => countriesVM.Add(new CountryWithCitiesVM { Country = x, Cities = x.Cities }));
            countries.ForEach(x => _service.Setup(c => c.Create(x)));
            _service.Setup(x => x.AllCountries()).ReturnsAsync(countriesVM);

            var result = await _service.Object.AllCountries();

            Assert.Equal(countriesVM, result);
        }

        [Fact]
        [Trait("Repository", "CountryFindAllCountries")]
        public async Task Find_CallMethod_ReturnsNullIfListIsEmpty()
        {
            _service.Setup(x => x.AllCountries()).Returns(Task.FromResult<List<CountryWithCitiesVM>>(null));

            var result = await _service.Object.AllCountries();

            Assert.Null(result);
        }

        #endregion

        #endregion

        #region Update

        #region UpdateCountry

        [Fact]
        [Trait("Repository", "CountryEditCountryValidData")]
        public async Task Edit_SubmitValidData_ReturnsUpdatedCountry()
        {
            var country = OneValidCountry();
            var editCountry = country;
            editCountry.Name = "Edited";
            _service.Setup(x => x.Create(country));
            _service.Setup(x => x.Edit(editCountry)).ReturnsAsync(editCountry);

            var result = await _service.Object.Edit(editCountry);

            Assert.Equal(editCountry, result);
            Assert.Equal("Edited", result.Name);
        }

        [Fact]
        [Trait("Repository", "CountryEditCountryInvalidData")]
        public async Task Edit_SubmitInvalidData_ReturnsNullValueAndOriginalCountryWasNotChanged()
        {
            var country = OneValidCountry();
            var editCountry = country;
            editCountry.Name = "";
            _service.Setup(x => x.Create(country));
            _service.Setup(x => x.Edit(editCountry)).Returns(Task.FromResult<Country>(null));
            _service.Setup(x => x.FindCountry(country.Id)).ReturnsAsync(new CountryWithCitiesVM { Country = country });

            var result = await _service.Object.Edit(editCountry);
            var original = await _service.Object.FindCountry(editCountry.Id);

            Assert.Null(result);
            Assert.Equal(country, original.Country);
        }

        #endregion

        #region AddCities

        [Fact]
        [Trait("Repository", "CountryAddCities")]
        public async Task Edit_SubmitValidIds_ReturnsUpdatedCountryWithCities()
        {
            var country = OneValidCountry();
            country.Cities = new List<City>();
            var cities = TwoCities();
            _service.Setup(x => x.Create(country));
            _service.Setup(x => x.AddCities(country.Id, cities)).ReturnsAsync(new Country { Id = country.Id, Name = country.Name, Population = country.Population, Cities = cities });

            var result = await _service.Object.AddCities(country.Id, cities);

            Assert.Equal(cities, result.Cities);
        }

        [Fact]
        [Trait("Repository", "CountryAddCities")]
        public async Task Edit_SubmitInvalidCities_ReturnsNullValueAndVerifiesCountryWasNotChanged()
        {
            var country = OneValidCountry();
            country.Cities = new List<City>();
            _service.Setup(x => x.Create(country));
            _service.Setup(x => x.AddCities(country.Id, null)).Returns(Task.FromResult<Country>(null));
            _service.Setup(x => x.FindCountry(country.Id)).ReturnsAsync(new CountryWithCitiesVM { Country = country, Cities = country.Cities });

            var result = await _service.Object.AddCities(country.Id, null);
            var original = await _service.Object.FindCountry(country.Id);

            Assert.Null(result);
            Assert.Equal(country, original.Country);
        }

        #endregion

        #endregion

        #region Delete

        #region Success

        [Fact]
        [Trait("Repository", "CountryDeleteValidId")]
        public async Task Delete_SubmitValidId_ReturnsTrueValue()
        {
            var country = OneValidCountry();
            _service.Setup(x => x.Create(country));
            _service.Setup(x => x.Delete(country.Id)).ReturnsAsync(true);

            var result = await _service.Object.Delete(country.Id);

            Assert.True(result);
        }

        [Fact]
        [Trait("Repository", "CountryDeleteValidId")]
        public async Task Delete_SubmitValidId_RemovesCorrectCountry()
        {
            var countries = TwoValidCountries();
            var country = countries.LastOrDefault();
            countries.ForEach(x => _service.Setup(c => c.Create(x)));
            _service.Setup(x => x.Delete(country.Id)).ReturnsAsync(true);
            _service.Setup(x => x.FindCountry(country.Id)).Returns(Task.FromResult<CountryWithCitiesVM>(null));

            var removed = await _service.Object.Delete(country.Id);
            var verify = await _service.Object.FindCountry(country.Id);

            Assert.True(removed);
            Assert.Null(verify);
        }

        #endregion

        #region Failed

        [Fact]
        [Trait("Repository", "CountryDeleteInvalidId")]
        public async Task Delete_SubmitInvalidId_ReturnsFalseValue()
        {
            var country = OneValidCountry();
            var fakeId = IdGeneration();
            _service.Setup(x => x.Create(country));
            _service.Setup(x => x.Delete(fakeId)).ReturnsAsync(false);

            var result = await _service.Object.Delete(fakeId);

            Assert.False(result);
        }

        [Fact]
        [Trait("Repository", "CountryDeleteInvalidId")]
        public async Task Delete_SubmitInvalidId_DoesNotRemoveAnyCountries()
        {
            var countries = TwoValidCountries();
            var countriesVM = new List<CountryWithCitiesVM>();
            countries.ForEach(x => countriesVM.Add(new CountryWithCitiesVM { Country = x, Cities = x.Cities }));
            var fakeId = IdGeneration();
            countries.ForEach(x => _service.Setup(c => c.Create(x)));
            _service.Setup(x => x.Delete(fakeId)).ReturnsAsync(false);
            _service.Setup(x => x.AllCountries()).ReturnsAsync(countriesVM);

            var falseResult = await _service.Object.Delete(fakeId);
            var listResult = await _service.Object.AllCountries();

            Assert.False(falseResult);
            Assert.Equal(2, listResult.Count);
        }

        #endregion

        #endregion
    }
}
