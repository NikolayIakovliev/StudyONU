using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Account;
using StudyONU.Logic.Infrastructure;
using System.Threading.Tasks;

namespace StudyONU.Admin.Builder
{
    static class DatabaseSeedBuilderExtensions
    {
        public async static Task<IApplicationBuilder> UseDatabaseSeed(this IApplicationBuilder app)
        {
            ILogger logger = app.ApplicationServices.GetService<ILogger>();
            IAccountService service = app.ApplicationServices.GetService<IAccountService>();

            using (service)
            {
                ServiceMessage serviceMessage = await service.InitializeRoles();
                if (serviceMessage.ActionResult == ServiceActionResult.Exception)
                {
                    logger.Fatal("Error at DatabaseSeedBuilderExtensions. IAccountService.InitializeRoles failed");
                }

                RegisterUserDTO admin = new RegisterUserDTO
                {
                    FirstName = "Admin",
                    Patronymic = "Adminovich",
                    LastName = "Adminov",
                    Email = "admin@gmail.com",
                    PhotoPath = "/images/admin.png",
                    Password = "admin@gmail.com"
                };

                serviceMessage = await service.RegisterAdminAsync(admin);
                if (serviceMessage.ActionResult == ServiceActionResult.Exception)
                {
                    logger.Fatal("Error at DatabaseSeedBuilderExtensions. IAccountService.RegisterAdminAsync failed");
                }

                RegisterUserDTO developer = new RegisterUserDTO
                {
                    FirstName = "Николай",
                    Patronymic = "Олегович",
                    LastName = "Яковлев",
                    Email = "nikolay.iakovliev.web@gmail.com",
                    PhotoPath = "/images/developer.png",
                    Password = "nikolay.iakovliev.web@gmail.com"
                };

                serviceMessage = await service.RegisterDeveloperAsync(developer);
                if (serviceMessage.ActionResult == ServiceActionResult.Exception)
                {
                    logger.Fatal("Error at DatabaseSeedBuilderExtensions. IAccountService.RegisterDeveloperAsync failed");
                }
            }

            return app;
        }
    }
}
