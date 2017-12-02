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
            services.AddTransient<ICourseService, CourseService>();
            services.AddTransient<IGuideService, GuideService>();
            services.AddTransient<ITaskService, TaskService>();
            services.AddTransient<IStudentQueueService, StudentQueueService>();
            services.AddTransient<IReportService, ReportService>();
            services.AddTransient<ICommentService, CommentService>();
            services.AddTransient<ICourseReportService, CourseReportService>();

            return services;
        }
    }
}
