using Microsoft.EntityFrameworkCore;
using StudyONU.Core;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts.Repositories;
using System.Threading.Tasks;

namespace StudyONU.Data.Repositories
{
    public class StudentCourseRepository : RepositoryBase<StudentCourseEntity>, IStudentCourseRepository
    {
        public StudentCourseRepository(StudyONUDbContext context)
            : base(context) { }

        public Task<bool> IsInCourse(int studentId, int courseId)
        {
            return context.StudentsInCourses.AnyAsync(
                studentCourse => studentCourse.CourseId == studentId && 
                studentCourse.CourseId == courseId
                );
        }
    }
}
