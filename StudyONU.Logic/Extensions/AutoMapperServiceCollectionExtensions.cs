using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using StudyONU.Logic.Mappings;

namespace StudyONU.Logic.Extensions
{
    public static class AutoMapperServiceCollectionExtensions
    {
        public static IServiceCollection AddAutoMapper(this IServiceCollection services)
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
                config.AddProfile<ReportProfile>();
                config.AddProfile<CourseReportProfile>();
                config.AddProfile<LecturerQueueProfile>();
            });

            return services;
        }
    }
}
