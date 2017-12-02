using Microsoft.EntityFrameworkCore;
using StudyONU.Core;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts.Repositories;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace StudyONU.Data.Repositories
{
    public class StudentRepository : RepositoryBase<StudentEntity>, IStudentRepository
    {
        public StudentRepository(StudyONUDbContext context)
            : base(context) { }

        public async Task<IEnumerable<StudentEntity>> GetByCourseAsnyc(int courseId)
        {
            return await context.Students
                .Include(student => student.User)
                .Where(student => student.Courses.Any(course => course.CourseId == courseId))
                .ToListAsync();
        }

        public Task<StudentEntity> GetByEmailAsync(string email)
        {
            return context.Students
                .Include(student => student.User)
                .ThenInclude(user => user.Role)
                .FirstOrDefaultAsync(student => student.User.Email == email);
        }
    }
}
