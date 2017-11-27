using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StudyONU.Web.Helpers;
using StudyONU.Web.Options;

namespace StudyONU.Web.Extensions
{
    public static class DomainServiceCollectionExtensions
    {
        public static IServiceCollection AddDomain(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<DomainOptions>(configuration.GetSection("Domain"));

            services.AddSingleton<DomainHelper>();

            return services;
        }
    }
}
