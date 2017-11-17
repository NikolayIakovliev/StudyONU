using StudyONU.Core.Entities;
using System.Threading.Tasks;

namespace StudyONU.Data.Contracts.Repositories
{
    public interface IStudentCourseRepository : IRepository<StudentCourseEntity>
    {
        Task<bool> IsInCourse(int studentId, int courseId);
    }
}
