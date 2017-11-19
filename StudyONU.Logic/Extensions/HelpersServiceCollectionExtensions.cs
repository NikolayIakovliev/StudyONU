using Microsoft.Extensions.DependencyInjection;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Helpers;

namespace StudyONU.Logic.Extensions
{
    public static class HelpersServiceCollectionExtensions
    {
        public static IServiceCollection AddHelpers(this IServiceCollection services)
        {
            services.AddTransient<IPasswordHasher, PasswordHasher>();
            services.AddTransient<IFileHelper, FileHelper>();
            services.AddTransient<IEmailSender, EmailSender>();

            return services;
        }
    }
}
