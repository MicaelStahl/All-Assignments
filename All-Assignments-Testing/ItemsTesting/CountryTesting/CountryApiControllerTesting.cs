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

namespace All_Assignments_Testing.ItemsTesting.CountryTesting
{
    public class CountryApiControllerTesting
    {
        #region D.I

        private readonly Mock<ICountryRepository> _service;
        private readonly CountryApiController _controller;

        public CountryApiControllerTesting()
        {
            _service = new Mock<ICountryRepository>();
            _controller = new CountryApiController(_service.Object);
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
        [Trait("Category", "CountryValidModelState")]
        public async Task Create_ValidModelState_ReturnsOkObjectResultAndCreatedCountry()
        {
            var country = OneValidCountry();
            _service.Setup(x => x.Create(country)).ReturnsAsync(country);

            var result = await _controller.Create(country);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<Country>(okResult.Value);
            Assert.Equal(country, model);
        }

        #endregion

        #region Failed

        [Fact]
        [Trait("Category", "CountryInvalidModelState")]
        public async Task Create_InvalidModelState_ReturnsBadRequestObjectResult()
        {
            var country = OneInvalidCountry();
            _service.Setup(x => x.Create(country)).Returns(Task.FromResult<Country>(null));
            _controller.ModelState.AddModelError("Invalid Inputs", "Invalid inputs");

            var result = await _controller.Create(country);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        [Trait("Category", "CountryValidModelState")]
        public async Task Create_ValidModelStateRandomError_ReturnsBadRequestObjectResult()
        {
            var country = OneInvalidCountry();
            _service.Setup(x => x.Create(country)).Returns(Task.FromResult<Country>(null));

            var result = await _controller.Create(country);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        #endregion

        #endregion

        #region Find

        #region FindOne

        [Fact]
        [Trait("Category", "CountryFindOne")]
        public async Task Find_SubmitValidId_ReturnsOkObjectResultAndCorrectCountry()
        { // NOTE: Using two countries since that'll easier prove the test is working properly.
            var countries = TwoValidCountries();
            var country = countries.LastOrDefault();
            countries.ForEach(x => _service.Setup(c => c.Create(x)));
            _service.Setup(x => x.FindCountry(country.Id)).ReturnsAsync(new CountryWithCitiesVM { Country = country, Cities = country.Cities });

            var result = await _controller.Get(country.Id);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<CountryWithCitiesVM>(okResult.Value);
            Assert.Equal(country, model.Country);
        }

        [Fact]
        [Trait("Category", "CountryFindOne")]
        public async Task Find_SubmitInvalidId_ReturnsBadRequestObjectResult()
        {
            var countries = TwoValidCountries();
            var fakeId = IdGeneration();
            countries.ForEach(x => _service.Setup(c => c.Create(x)));
            _service.Setup(x => x.FindCountry(fakeId)).Returns(Task.FromResult<CountryWithCitiesVM>(null));

            var result = await _controller.Get(fakeId);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        [Trait("Category", "CountryFindOne")]
        public async Task Find_SubmitEmptyId_ReturnsBadRequestResult()
        {
            var countries = TwoValidCountries();
            var fakeId = Guid.Empty;
            countries.ForEach(x => _service.Setup(c => c.Create(x)));
            _service.Setup(x => x.FindCountry(fakeId)).Returns(Task.FromResult<CountryWithCitiesVM>(null));

            var result = await _controller.Get(fakeId);

            Assert.IsType<BadRequestResult>(result);
        }

        #endregion

        #region FindAll

        [Fact]
        [Trait("Category", "CountryFindAll")]
        public async Task Find_CallMethod_ReturnsOkObjectResultAndListOfTwoCountries()
        { // Doing a double, because I have two identical methods in the controller, but don't dare removing either since that'll require a lot of work.
            var countriesVM = new List<CountryWithCitiesVM>();
            var countries = TwoValidCountries();
            countries.ForEach(x => countriesVM.Add(new CountryWithCitiesVM { Cities = x.Cities, Country = x }));
            countries.ForEach(x => _service.Setup(c => c.Create(x)));
            _service.Setup(x => x.AllCountries()).ReturnsAsync(countriesVM);

            var firstResult = await _controller.GetAll();
            var secondResult = await _controller.GetAllForCity();

            var firstOkResult = Assert.IsType<OkObjectResult>(firstResult);
            var secondOkResult = Assert.IsType<OkObjectResult>(secondResult);
            var firstModel = Assert.IsAssignableFrom<List<CountryWithCitiesVM>>(firstOkResult.Value);
            var secondModel =Assert.IsAssignableFrom<List<CountryWithCitiesVM>>(secondOkResult.Value);
            Assert.Equal(countriesVM, firstModel);
            Assert.Equal(countriesVM, secondModel);
        }

        [Fact]
        [Trait("Category", "CountryFindAll")]
        public async Task Find_CallMethod_ReturnsBadRequestIfListIsEmpty()
        {
            _service.Setup(x => x.AllCountries()).Returns(Task.FromResult<List<CountryWithCitiesVM>>(null));

            var firstResult = await _controller.GetAll();
            var secondresult = await _controller.GetAllForCity();

            Assert.IsType<BadRequestObjectResult>(firstResult);
            Assert.IsType<BadRequestResult>(secondresult);
        }

        #endregion

        #endregion

        #region Update

        #region Success

        [Fact]
        [Trait("Category", "CountryEditValidModelState")]
        public async Task Edit_ValidModelState_ReturnsOkObjectResultAndUpdatedCountry()
        {
            var country = OneValidCountry();
            var editCountry = country;
            editCountry.Name = "Edited";
            _service.Setup(x => x.Create(country));
            _service.Setup(x => x.Edit(editCountry)).ReturnsAsync(editCountry);

            var result = await _controller.Edit(editCountry);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<Country>(okResult.Value);
            Assert.Equal(editCountry, model);
        }

        #endregion

        #region Failed

        [Fact]
        [Trait("Category", "CountryEditInvalidModelState")]
        public async Task Edit_InvalidModelState_ReturnsBadRequestObjectResult()
        {
            var country = OneValidCountry();
            var editCountry = country;
            editCountry.Name = "";
            _service.Setup(x => x.Create(country));
            _service.Setup(x => x.Edit(editCountry)).Returns(Task.FromResult<Country>(null));
            _controller.ModelState.AddModelError("Invalid input", "Invalid inputs");

            var result = await _controller.Edit(editCountry);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        [Trait("Category", "CountryEditValidModelState")]
        public async Task Edit_ValidModelStateInvalidData_ReturnsBadRequestObjectResult()
        {
            var country = OneValidCountry();
            var editCountry = country;
            editCountry.Name = "";
            _service.Setup(x => x.Create(country));
            _service.Setup(x => x.Edit(editCountry)).Returns(Task.FromResult<Country>(null));

            var result = await _controller.Edit(editCountry);

            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Contains("Something went wrong", badRequest.Value.ToString());
        }

        #endregion

        #endregion

        #region Delete

        #region Success

        [Fact]
        [Trait("Category", "CountryDeleteValidId")]
        public async Task Delete_SubmitValidId_ReturnsOkObjectResultAndTrueValue()
        {
            var countries = TwoValidCountries();
            var country = countries.LastOrDefault();
            countries.ForEach(x => _service.Setup(c => c.Create(x)));
            _service.Setup(x => x.Delete(country.Id)).ReturnsAsync(true);

            var result = await _controller.Delete(country.Id);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<bool>(okResult.Value);
            Assert.True(model);
        }

        #endregion

        #region Failed

        [Fact]
        [Trait("Category", "CountryDeleteInvalidId")]
        public async Task Delete_SubmitInvalidId_ReturnsBadRequestObjectResult()
        {
            var country = OneValidCountry();
            var fakeId = IdGeneration();
            _service.Setup(x => x.Create(country));
            _service.Setup(x => x.Delete(fakeId)).ReturnsAsync(false);

            var result = await _controller.Delete(fakeId);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        [Trait("Category", "CountryDeleteInvalidId")]
        public async Task Delete_SubmitEmptyId_ReturnsBadRequestResult()
        {
            var country = OneValidCountry();
            var fakeId = Guid.Empty;
            _service.Setup(x => x.Create(country));
            _service.Setup(x => x.Delete(fakeId)).ReturnsAsync(false);

            var result = await _controller.Delete(fakeId);

            Assert.IsType<BadRequestResult>(result);
        }

        #endregion

        #endregion
    }
}
