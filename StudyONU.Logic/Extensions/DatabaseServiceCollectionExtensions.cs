using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StudyONU.Core;

namespace StudyONU.Logic.Extensions
{
    public static class DatabaseServiceCollectionExtensions
    {
        public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("Development");

            services.AddDbContext<StudyONUDbContext>(options => options.UseSqlServer(connectionString));

            return services;
        }
    }
}
