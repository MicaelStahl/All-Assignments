using System;
using System.Linq;
using All_Assignments.Database;
using All_Assignments.Models.Assignment10Models;
using All_Assignments.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace All_Assignments
{
    internal class AllAssignmentsDbInitializer
    {
        internal static void Initializer(AllAssignmentsDbContext context, UserManager<AppUser10> userManager, RoleManager<IdentityRole> roleManager)
        {
            context.Database.EnsureCreated();

            #region Roles

            if (!roleManager.RoleExistsAsync("Admin").Result)
            {
                var role = new IdentityRole("Admin");

                roleManager.CreateAsync(role).Wait();
            }

            if (!roleManager.RoleExistsAsync("NormalUser").Result)
            {
                var role = new IdentityRole("NormalUser");

                roleManager.CreateAsync(role).Wait();
            }

            #endregion

            #region Users

            if (userManager.FindByNameAsync("Administrator").Result == null)
            {
                var user = new AppUser10()
                {
                    UserName = "Administrator",
                    FirstName = "Admin",
                    LastName = "Pontifex",
                    Age = 30,
                    Email = "Administrator@Admin.com",
                    PhoneNumber = "123456789",
                };
                //user.UserToken = userManager.GenerateUserTokenAsync(user, TokenOptions.DefaultAuthenticatorProvider, "Authentication").Result;

                var result = userManager.CreateAsync(user, "Password!23").Result;
                
                //userManager.SetAuthenticationTokenAsync(user, TokenOptions.DefaultAuthenticatorProvider, "Authentication", user.UserToken).Wait();

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Admin").Wait();
                    userManager.AddToRoleAsync(user, "NormalUser").Wait();
                }
            }

            if (userManager.FindByNameAsync("NormalUser").Result == null)
            {
                AppUser10 user = new AppUser10()
                {
                    UserName = "NormalUser",
                    FirstName = "NormalUser",
                    LastName = "NormalUser",
                    Email = "Normal@User.com",
                    Age = 18,
                    PhoneNumber = "987654321",
                };

                //user.UserToken = userManager.GenerateUserTokenAsync(user, TokenOptions.DefaultAuthenticatorProvider, "Authentication").Result;

                var result = userManager.CreateAsync(user, "Password!23").Result;

                //userManager.SetAuthenticationTokenAsync(user, TokenOptions.DefaultAuthenticatorProvider, "Authentication", user.UserToken).Wait();

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "NormalUser").Wait();
                }
            }

            #endregion

            #region Assignment10

            if (!context.Countries.Any())
            {
                var countries = new Country[]
                {
                    new Country() { Name = "Sweden", Population = "10.301.210" },
                    new Country() { Name = "Denmark", Population = "5.512.563" },
                    new Country() { Name = "Norway", Population = "5.123.643" }
                };

                context.Countries.AddRange(countries);

                context.SaveChanges();

                if (!context.Cities.Any())
                {
                    var cities = new City[]
                    {
                        new City() { Name = "Swedish City 1", Population = "1.123.675", Country = countries[0] },
                        new City() { Name = "Swedish City 2", Population = "654.363", Country = countries[0] },
                        new City() { Name = "Swedish City 3", Population = "364.921", Country = countries[0] },

                        new City() { Name = "Danish City 1", Population = "715.741", Country = countries[1] },
                        new City() { Name = "Danish City 2", Population = "235.631", Country = countries[1] },
                        new City() { Name = "Danish City 3", Population = "134.673", Country = countries[1] },

                        new City() { Name = "Norwegian City 1", Population = "543.421", Country = countries[2] },
                        new City() { Name = "Norwegian City 2", Population = "361.752", Country = countries[2] },
                        new City() { Name = "Norwegian City 3", Population = "134.673", Country = countries[2] },
                    };

                    context.Cities.AddRange(cities);

                    context.SaveChanges();

                    if (!context.People.Any())
                    {
                        var people = new Person[]
                        {
                            new Person() { FirstName = "Swedish Person", LastName = "1", Age = 20, Gender = "Male", Email = "Swedish1@Swedish.com", PhoneNumber = "123456789", City=cities[0] },
                            new Person() { FirstName = "Swedish Person", LastName = "2", Age = 21, Gender = "Male", Email = "Swedish2@Swedish.com", PhoneNumber = "123456789", City=cities[0] },
                            new Person() { FirstName = "Swedish Person", LastName = "3", Age = 25, Gender = "Female", Email = "Swedish3@Swedish.com", PhoneNumber = "123456789", City=cities[1] },
                            new Person() { FirstName = "Swedish Person", LastName = "4", Age = 28, Gender = "Male", Email = "Swedish4@Swedish.com", PhoneNumber = "123456789", City=cities[1] },
                            new Person() { FirstName = "Swedish Person", LastName = "5", Age = 31, Gender = "Male", Email = "Swedish5@Swedish.com", PhoneNumber = "123456789", City=cities[2] },
                            new Person() { FirstName = "Swedish Person", LastName = "6", Age = 75, Gender = "Female", Email = "Swedish6@Swedish.com", PhoneNumber = "123456789", City=cities[2] },

                            new Person() { FirstName = "Danish Person", LastName = "1", Age = 51, Gender = "Female", Email = "Danish1@Danish.com", PhoneNumber = "123456789", City=cities[3] },
                            new Person() { FirstName = "Danish Person", LastName = "2", Age = 69, Gender = "Male", Email = "Danish2@Danish.com", PhoneNumber = "123456789", City=cities[3] },
                            new Person() { FirstName = "Danish Person", LastName = "3", Age = 12, Gender = "Female", Email = "Danish3@Danish.com", PhoneNumber = "123456789", City=cities[4] },
                            new Person() { FirstName = "Danish Person", LastName = "4", Age = 75, Gender = "Male", Email = "Danish4@Danish.com", PhoneNumber = "123456789", City=cities[4] },
                            new Person() { FirstName = "Danish Person", LastName = "5", Age = 43, Gender = "Female", Email = "Danish5@Danish.com", PhoneNumber = "123456789", City=cities[5] },
                            new Person() { FirstName = "Danish Person", LastName = "6", Age = 34, Gender = "Male", Email = "Danish6@Danish.com", PhoneNumber = "123456789", City=cities[5] },

                            new Person() { FirstName = "Norwegian Person", LastName = "1", Age = 51, Gender = "Male", Email = "Norwegian1@Norwegian.com", PhoneNumber = "123456789", City=cities[6] },
                            new Person() { FirstName = "Norwegian Person", LastName = "2", Age = 69, Gender = "Male", Email = "Norwegian2@Norwegian.com", PhoneNumber = "123456789", City=cities[6] },
                            new Person() { FirstName = "Norwegian Person", LastName = "3", Age = 12, Gender = "Female", Email = "Norwegian3@Norwegian.com", PhoneNumber = "123456789", City=cities[7] },
                            new Person() { FirstName = "Norwegian Person", LastName = "4", Age = 75, Gender = "Female", Email = "Norwegian4@Norwegian.com", PhoneNumber = "123456789", City=cities[7] },
                            new Person() { FirstName = "Norwegian Person", LastName = "5", Age = 43, Gender = "Female", Email = "Norwegian5@Norwegian.com", PhoneNumber = "123456789", City=cities[8] },
                            new Person() { FirstName = "Norwegian Person", LastName = "6", Age = 34, Gender = "Male", Email = "Norwegian6@Norwegian.com", PhoneNumber = "123456789", City=cities[8] },
                        };

                        context.People.AddRange(people);

                        context.SaveChanges();
                    }
                }
            }

            #endregion
        }
    }
}