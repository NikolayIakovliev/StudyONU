using StudyONU.Data.Contracts.Repositories;
using System;
using System.Threading.Tasks;

namespace StudyONU.Data.Contracts
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<TEntity> GetRepository<TEntity>() where TEntity : class;

        IAdminRepository Admins { get; }

        ICommentRepository Comments { get; }

        ICourseRepository Courses { get; }

        IGuideRepository Guides { get; }

        ILecturerRepository Lecturers { get; }

        IReportRepository Reports { get; }

        IRoleRepository Roles { get; }

        ISpecialityRepository Specialities { get; }

        IStudentCourseRepository StudentCourse { get; }

        IStudentQueueRepository StudentQueue { get; }

        IStudentRepository Students { get; }

        ITaskRepository Tasks { get; }

        IUserRepository Users { get; }

        Task CommitAsync();
    }
}
