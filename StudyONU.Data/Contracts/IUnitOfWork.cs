using StudyONU.Data.Contracts.Repositories;
using System;
using System.Threading.Tasks;

namespace StudyONU.Data.Contracts
{
    public interface IUnitOfWork : IDisposable
    {
        IApplicationUserRepository ApplicationUsers { get; }

        ICommentRepository Comments { get; }

        ICourseRepository Courses { get; }

        IGuideRepository Guides { get; }

        ILecturerRepository Lecturers { get; }

        IReportRepository Reports { get; }

        ISpecialityRepository Specialities { get; }

        IStudentQueueRepository StudentQueue { get; }

        IStudentRepository Students { get; }

        ITaskRepository Tasks { get; }

        Task CommitAsync();
    }
}
