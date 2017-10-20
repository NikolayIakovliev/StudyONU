using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace StudyONU.Logic.Extensions
{
    public static class LogicFacadeServiceCollectionExtension
    {
        public static IServiceCollection AddLogic(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHelpers();
            services.AddDatabase(configuration);
            services.AddRepositories();
            services.AddAutoMapper(configuration);
            services.AddServices();

            return services;
        }
    }
}
