using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Helpers;

namespace StudyONU.Logic.Extensions
{
    public static class LogicFacadeServiceCollectionExtension
    {
        public static IServiceCollection AddLogic(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IPasswordHasher, PasswordHasher>();
            services.AddTransient<IExceptionMessageBuilder, ExceptionMessageBuilder>();

            services.AddDatabase(configuration);
            services.AddRepositories();
            services.AddAutoMapper(configuration);
            services.AddServices();

            return services;
        }
    }
}
