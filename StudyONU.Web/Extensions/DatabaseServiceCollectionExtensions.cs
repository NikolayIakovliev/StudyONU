using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StudyONU.Core;
using StudyONU.Core.Identity;

namespace StudyONU.Web.Extensions
{
    static class DatabaseServiceCollectionExtensions
    {
        public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("Development");

            services
                .AddDbContext<StudyONUDbContext>(options => options.UseSqlServer(connectionString))
                .AddIdentity<ApplicationUser, ApplicationRole>(options => options.User.RequireUniqueEmail = true)
                .AddEntityFrameworkStores<StudyONUDbContext>();

            return services;
        }
    }
}
