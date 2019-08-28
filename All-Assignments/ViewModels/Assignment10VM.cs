using All_Assignments.Models.Assignment10Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace All_Assignments.ViewModels
{
    public class PersonWithCityVM
    {
        public Person Person { get; set; }

        public string CityName { get; set; }

        public Guid? CityId { get; set; }
    }

    public class PersonWithCityIdVM
    {
        public Person Person { get; set; }

        public Guid? CityId { get; set; }
    }

    public class CityWithCountryVM
    {
        public City City { get; set; }

        public string CountryName { get; set; }

        public Guid? CountryId { get; set; }

        public List<Person> People { get; set; }
    }

    public class CityWithCountryIdVM
    {
        public City City { get; set; }

        public Guid? CountryId { get; set; }
    }

    public class CityEditVM
    {
        public City City { get; set; }

        public Guid? CountryId { get; set; }

        public string CountryName { get; set; }

        public List<Person> People { get; set; }

        public List<Country> Countries { get; set; }
    }

    public class CountryWithCitiesVM
    {
        public Country Country { get; set; }

        public List<City> Cities { get; set; }
    }
}
