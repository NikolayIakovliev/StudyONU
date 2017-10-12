using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.Infrastructure;
using System.Threading.Tasks;

namespace StudyONU.Admin.Middleware
{
    public class RoleMiddleware
    {
        private readonly RequestDelegate next;

        public RoleMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            IAccountService service = httpContext.RequestServices.GetService<IAccountService>();

            ServiceMessage serviceMessage = await service.InitializeRoles();
            if (serviceMessage.ActionResult == ServiceActionResult.Exception)
            {
                // TODO
                // implement logging
            }

            await next(httpContext);
        }
    }
}
