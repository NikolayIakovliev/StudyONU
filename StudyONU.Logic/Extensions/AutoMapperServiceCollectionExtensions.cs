using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StudyONU.Logic.Mappings;

namespace StudyONU.Logic.Extensions
{
    public static class AutoMapperServiceCollectionExtensions
    {
        public static IServiceCollection AddAutoMapper(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(config =>
            {
                config.AddProfile<LecturerProfile>();
                config.AddProfile<SpecialityProfile>();
                config.AddProfile<CourseProfile>();
                config.AddProfile<GuideProfile>();
                config.AddProfile<TaskProfile>();
                config.AddProfile<StudentQueueProfile>();
                config.AddProfile<CommentProfile>();
            });

            return services;
        }
    }
}
