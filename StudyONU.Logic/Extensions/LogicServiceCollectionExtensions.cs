using Microsoft.Extensions.DependencyInjection;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.Contracts.Services.Authentication;
using StudyONU.Logic.Services;
using StudyONU.Logic.Services.Authentication;

namespace StudyONU.Logic.Extensions
{
    public static class LogicServiceCollectionExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddTransient<ITokenService, TokenService>();
            services.AddTransient<IAccountService, AccountService>();
            services.AddTransient<ILecturerService, LecturerService>();
            services.AddTransient<ISpecialityService, SpecialityService>();

            return services;
        }
    }
}
