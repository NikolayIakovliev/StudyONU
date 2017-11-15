using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using StudyONU.Logic.Contracts;
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
            ILogger logger = httpContext.RequestServices.GetService<ILogger>();
            IAccountService service = httpContext.RequestServices.GetService<IAccountService>();

            ServiceMessage serviceMessage = await service.InitializeRoles();
            if (serviceMessage.ActionResult == ServiceActionResult.Exception)
            {
                logger.Fatal("Error at RoleMiddleware. IAccountService.InitializeRoles failed");
            }

            await next(httpContext);
        }
    }
}
