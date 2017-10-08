using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using StudyONU.Core;
using StudyONU.Core.Identity;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StudyONU.Logic.Infrastructure;

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
            StudyONUDbContext context = httpContext.RequestServices.GetService<StudyONUDbContext>();

            try
            {
                bool exists = context.Users.Any(user => user.Email == "nikolay.iakovliev.web@gmail.com");
                if (!exists)
                {
                    ApplicationUser applicationUser = new ApplicationUser
                    {
                        FirstName = "Admin",
                        Patronymic = "Adminovich",
                        LastName = "Adminov",
                        Email = "nikolay.iakovliev.web@gmail.com",
                        PhotoPath = "admin.png"
                    };

                    await context.Users.AddAsync(applicationUser);
                    await context.SaveChangesAsync();

                    ApplicationRole applicationRole = await context.Roles.FirstOrDefaultAsync(role => role.Name == Roles.Admin);
                    IdentityUserRole<int> userRole = new IdentityUserRole<int>
                    {
                        UserId = applicationUser.Id,
                        RoleId = applicationRole.Id
                    };

                    await context.UserRoles.AddAsync(userRole);
                    await context.SaveChangesAsync();
                }
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
