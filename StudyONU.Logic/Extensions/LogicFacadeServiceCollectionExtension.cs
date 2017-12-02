using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace StudyONU.Logic.Extensions
{
    public static class LogicFacadeServiceCollectionExtension
    {
        public static IServiceCollection AddLogic(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddLogging(configuration);
            services.AddHelpers();
            services.AddServices();
            services.AddRepositories();
            services.AddDatabase(configuration);
            services.AddAutoMapper();

            return services;
        }
    }
}
