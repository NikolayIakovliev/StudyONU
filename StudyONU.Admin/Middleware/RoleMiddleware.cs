using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using StudyONU.Core;
using StudyONU.Core.Identity;
using StudyONU.Logic.Infrastructure;
using System.Linq;
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
            StudyONUDbContext context = httpContext.RequestServices.GetService<StudyONUDbContext>();

            try
            {
                foreach (string roleName in Roles.GetRoles())
                {
                    bool exists = context.Roles.Any(applicationRole => applicationRole.Name == roleName);
                    if (!exists)
                    {
                        ApplicationRole applicationRole = new ApplicationRole
                        {
                            Name = roleName
                        };
                        await context.Roles.AddAsync(applicationRole);
                    }
                }

                await context.SaveChangesAsync();
            }
            catch
            {
                // TODO
                // implement logging
            }

            await next(httpContext);
        }
    }
}
