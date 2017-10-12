using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace StudyONU.Logic.Extensions
{
    public static class AutoMapperServiceCollectionExtensions
    {
        public static IServiceCollection AddAutoMapper(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper();

            return services;
        }
    }
}
