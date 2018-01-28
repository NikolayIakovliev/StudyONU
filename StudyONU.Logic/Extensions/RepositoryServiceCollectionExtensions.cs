using Microsoft.Extensions.DependencyInjection;
using StudyONU.Core.Entities;
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
            services.AddDefaultRepository<LecturerQueueEntity>();

            services.AddCustomRepository<IAdminRepository, AdminRepository>();
            services.AddCustomRepository<ICommentRepository, CommentRepository>();
            services.AddCustomRepository<ICourseRepository, CourseRepository>();
            services.AddCustomRepository<IGuideRepository, GuideRepository>();
            services.AddCustomRepository<ILecturerRepository, LecturerRepository>();
            services.AddCustomRepository<IReportRepository, ReportRepository>();
            services.AddCustomRepository<IRoleRepository, RoleRepository>();
            services.AddCustomRepository<ISpecialityRepository, SpecialityRepository>();
            services.AddCustomRepository<IStudentCourseRepository, StudentCourseRepository>();
            services.AddCustomRepository<IStudentQueueRepository, StudentQueueRepository>();
            services.AddCustomRepository<IStudentRepository, StudentRepository>();
            services.AddCustomRepository<ITaskRepository, TaskRepository>();
            services.AddCustomRepository<IUserRepository, UserRepository>();

            services.AddTransient<IUnitOfWork, UnitOfWork>();

            return services;
        }

        public static IServiceCollection AddDefaultRepository<TEntity>(this IServiceCollection services)
            where TEntity : class
        {
            services.AddTransient<IRepository<TEntity>, RepositoryCommon<TEntity>>();

            return services;
        }

        public static IServiceCollection AddRepository<TEntity, TImplementation>(this IServiceCollection services)
            where TEntity : class
            where TImplementation : class, IRepository<TEntity>
        {
            services.AddTransient<IRepository<TEntity>, TImplementation>();

            return services;
        }

        public static IServiceCollection AddCustomRepository<TRepository, TImplementation>(this IServiceCollection services)
            where TRepository : class
            where TImplementation : class, TRepository
        {
            services.AddTransient<TRepository, TImplementation>();
            services.AddTransient<Lazier<TRepository>>();

            return services;
        }
    }
}
