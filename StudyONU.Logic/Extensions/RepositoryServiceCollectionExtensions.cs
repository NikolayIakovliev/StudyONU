using Microsoft.Extensions.DependencyInjection;
using StudyONU.Core;
using StudyONU.Data.Contracts;
using StudyONU.Data.Contracts.Repositories;
using StudyONU.Data.Infrastructure;
using StudyONU.Data.Repositories;
using System;

namespace StudyONU.Logic.Extensions
{
    public static class RepositoryServiceCollectionExtensions
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddTransient<StudyONUDbContext, StudyONUDbContext>();

            services.AddTransient<IApplicationUserRepository, ApplicationUserRepository>();
            services.AddTransient<ICommentRepository, CommentRepository>();
            services.AddTransient<ICourseRepository, CourseRepository>();
            services.AddTransient<IGuideRepository, GuideRepository>();
            services.AddTransient<ILecturerRepository, LecturerRepository>();
            services.AddTransient<IReportRepository, ReportRepository>();
            services.AddTransient<ISpecialityRepository, SpecialityRepository>();
            services.AddTransient<IStudentQueueRepository, StudentQueueRepository>();
            services.AddTransient<IStudentRepository, StudentRepository>();
            services.AddTransient<ITaskRepository, TaskRepository>();

            services.AddTransient(typeof(Lazy<>), typeof(Lazier<>));
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            return services;
        }
    }
}
