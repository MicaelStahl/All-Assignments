using All_Assignments.Models.Assignment10Models;
using All_Assignments.ViewModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace All_Assignments.Database
{
    public class AllAssignmentsDbContext : IdentityDbContext<AppUser10>
    {
        public AllAssignmentsDbContext(DbContextOptions<AllAssignmentsDbContext> options) : base(options) { }

        public DbSet<Person> People { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Country> Countries { get; set; }
    }
}
