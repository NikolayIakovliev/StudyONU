using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Account;
using StudyONU.Logic.Infrastructure;
using System.Threading.Tasks;

namespace StudyONU.Admin.Middleware
{
    public class UserMiddleware
    {
        private readonly RequestDelegate next;

        public UserMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            IAccountService service = httpContext.RequestServices.GetService<IAccountService>();

            RegisterAdminDTO admin = new RegisterAdminDTO
            {
                FirstName = "Admin",
                Patronymic = "Adminovich",
                LastName = "Adminov",
                Email = "nikolay.iakovliev.web@gmail.com",
                PhotoPath = "/images/admin.png",
                Password = "nikolay.iakovliev.web@gmail.com"
            };

            ServiceMessage serviceMessage = await service.RegisterAdminAsync(admin);
            if (serviceMessage.ActionResult == ServiceActionResult.Exception)
            {
                // TODO
                // implement logging
            }

            await next(httpContext);
        }
    }
}
