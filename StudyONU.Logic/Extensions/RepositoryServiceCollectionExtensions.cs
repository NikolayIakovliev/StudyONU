using Microsoft.Extensions.DependencyInjection;
using StudyONU.Data.Contracts;
using StudyONU.Data.Contracts.Repositories;
using StudyONU.Data.Infrastructure;
using StudyONU.Data.Repositories;

namespace StudyONU.Logic.Extensions
{
    public static class RepositoryServiceCollectionExtensions
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddRepository<IAdminRepository, AdminRepository>();
            services.AddRepository<ICommentRepository, CommentRepository>();
            services.AddRepository<ICourseRepository, CourseRepository>();
            services.AddRepository<IGuideRepository, GuideRepository>();
            services.AddRepository<ILecturerRepository, LecturerRepository>();
            services.AddRepository<IReportRepository, ReportRepository>();
            services.AddRepository<IRoleRepository, RoleRepository>();
            services.AddRepository<ISpecialityRepository, SpecialityRepository>();
            services.AddRepository<IStudentQueueRepository, StudentQueueRepository>();
            services.AddRepository<IStudentRepository, StudentRepository>();
            services.AddRepository<ITaskRepository, TaskRepository>();
            services.AddRepository<IUserRepository, UserRepository>();

            services.AddTransient<IUnitOfWork, UnitOfWork>();

            return services;
        }

        public static IServiceCollection AddRepository<TRepository, TImplementation>(this IServiceCollection services)
            where TRepository : class
            where TImplementation : class, TRepository
        {
            services.AddTransient<TRepository, TImplementation>();
            services.AddTransient<Lazier<TRepository>>();
            
            return services;
        }
    }
}
