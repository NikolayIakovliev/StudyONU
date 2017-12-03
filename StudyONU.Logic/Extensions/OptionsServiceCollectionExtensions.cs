using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StudyONU.Logic.Options;

namespace StudyONU.Logic.Extensions
{
    public static class OptionsServiceCollectionExtensions
    {
        public static IServiceCollection AddOptions(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<LoggingOptions>(configuration.GetSection("Logging"));
            services.Configure<AuthOptions>(configuration.GetSection("Auth"));

            return services;
        }
    }
}
