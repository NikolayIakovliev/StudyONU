using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Helpers;
using StudyONU.Logic.Options;

namespace StudyONU.Logic.Extensions
{
    public static class LoggingServiceCollectionExtensions
    {
        public static IServiceCollection AddLogging(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<LoggingOptions>(configuration.GetSection("Logging"));

            services.AddTransient<ILogger, FileLogger>();

            return services;
        }
    }
}
