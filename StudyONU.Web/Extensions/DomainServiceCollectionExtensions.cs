using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StudyONU.Web.Options;

namespace StudyONU.Web.Extensions
{
    public static class DomainServiceCollectionExtensions
    {
        public static IServiceCollection AddWebOptions(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<DomainOptions>(configuration.GetSection("Domain"));

            return services;
        }
    }
}
