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

        public Guid? cityId { get; set; }
    }

    public class PersonWithCityIdVM
    {
        public Person Person { get; set; }

        public Guid? CityId { get; set; }
    }
}
