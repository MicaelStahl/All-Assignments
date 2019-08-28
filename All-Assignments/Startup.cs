using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using All_Assignments.Database;
using All_Assignments.Interfaces;
using All_Assignments.Interfaces.Assignment_10;
using All_Assignments.Interfaces.Assignment_10.Admin;
using All_Assignments.Repositories.Assignment_10;
using All_Assignments.Repositories.Assignment_10.Admin;
using All_Assignments.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace All_Assignments
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AllAssignmentsDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<AppUser10, IdentityRole>()
                .AddEntityFrameworkStores<AllAssignmentsDbContext>()
                .AddDefaultTokenProviders();

            //.AddTokenProvider<DataProtectorTokenProvider<AppUser10>>("Authentication")
            //.AddTokenProvider<DataProtectorTokenProvider<AppUser10>>("Verification")

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    // A * simply indicates it's open for all. This is ONLY the solution for developer code.
                    builder.WithOrigins("*")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            services.Configure<IdentityOptions>(options =>
            {   // Default password settings.
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 8;
                options.Password.RequiredUniqueChars = 1;

                //// Might Implement in the future
                //// User settings
                //options.User.RequireUniqueEmail = true;
                ////Lockout settings
                //options.Lockout.AllowedForNewUsers = true;
                //options.Lockout.MaxFailedAccessAttempts = 3;
                //options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(3);
            });

            services.Configure<PasswordHasherOptions>(options =>
            {
                options.IterationCount = 100_000;
            });

            services.AddScoped<IPersonRepository, PersonRepository>();
            services.AddScoped<ICityRepository, CityRepository>();
            services.AddScoped<ICountryRepository, CountryRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IAdminRepository, AdminRepository>();

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(20);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });

            #region Jwt Creation by https://bit.ly/31FTeUp

            //// configure strongly typed settings objects
            //var tokenManagement = Configuration.GetSection("TokenManagement");
            //services.Configure<TokenManagement>(tokenManagement);

            //// configure jwt authentication
            //var tokenSettings = tokenManagement.Get<TokenManagement>();
            //var key = Encoding.ASCII.GetBytes(tokenSettings.Secret);
            //services.AddAuthentication(options =>
            //{
            //    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //})
            //    .AddJwtBearer(options =>
            //    {
            //        options.RequireHttpsMetadata = false;
            //        options.SaveToken = true;
            //        options.TokenValidationParameters = new TokenValidationParameters
            //        {
            //            ValidateIssuerSigningKey = true,
            //            IssuerSigningKey = new SymmetricSecurityKey(key),
            //            ValidateIssuer = false,
            //            ValidateAudience = false,
            //        };
            //    });

            #endregion


            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,

                        ValidIssuer = "http://localhost:3000",
                        ValidAudience = "http://localhost:3000",
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Secret-key-frontend"))
                    };
                });


            //services.AddAuthentication(
            //    //JwtBearerDefaults.AuthenticationScheme
            //    options =>
            //{
            //    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //}
            //)
            //    .AddJwtBearer(options =>
            //    { // "http://localhost:50691" "http://localhost:44399"
            //        options.SaveToken = true;
            //        //options.Audience = "http://localhost:3000";
            //        //options.Authority = "http://localhost:3000";
            //        ////// Only disabled in Development. \\
            //        //options.RequireHttpsMetadata = false;
            //        //options.TokenValidationParameters = new TokenValidationParameters
            //        //{
            //        //    SaveSigninToken = true,
            //        //    //ValidateLifetime = true,
            //        //    //ValidateIssuer = false,
            //        //    //ValidateAudience = false
            //        //};
            //    });

            //services.AddAuthorization(options =>
            //{
            //    var defaultAuthorizationPolicyBuilder = new AuthorizationPolicyBuilder(
            //        JwtBearerDefaults.AuthenticationScheme);
            //    defaultAuthorizationPolicyBuilder.RequireAuthenticatedUser();
            //   options.DefaultPolicy = defaultAuthorizationPolicyBuilder.Build();
            //});

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseStaticFiles();

            app.UseCookiePolicy();

            //app.UseHttpsRedirection();

            app.UseSession();

            app.UseCors();

            //app.UseCors("AllowSpecificHosts");

            app.UseAuthentication();

            app.UseMvcWithDefaultRoute();
        }
    }
}
