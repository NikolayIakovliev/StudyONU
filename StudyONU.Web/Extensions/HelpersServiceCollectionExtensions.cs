using Microsoft.Extensions.DependencyInjection;
using StudyONU.Web.Helpers;

namespace StudyONU.Web.Extensions
{
    public static class HelpersServiceCollectionExtensions
    {
        public static IServiceCollection AddWebHelpers(this IServiceCollection services)
        {
            services.AddSingleton<DomainHelper>();
            services.AddSingleton<ProxyHelper>();

            return services;
        }
    }
}
