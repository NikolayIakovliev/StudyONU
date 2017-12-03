using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace StudyONU.Logic.Extensions
{
    public static class LogicFacadeServiceCollectionExtension
    {
        public static IServiceCollection AddLogic(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions(configuration);
            services.AddHelpers();
            services.AddServices();
            services.AddRepositories();
            services.AddDatabase(configuration);
            services.AddAutoMapper();
            services.AddAuthentication();

            return services;
        }
    }
}
