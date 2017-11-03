using Microsoft.EntityFrameworkCore;
using StudyONU.Core;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts.Repositories;
using System.Threading.Tasks;

namespace StudyONU.Data.Repositories
{
    public class StudentRepository : RepositoryBase<StudentEntity>, IStudentRepository
    {
        public StudentRepository(StudyONUDbContext context)
            : base(context) { }

        public Task<StudentEntity> GetByEmailAsync(string email)
        {
            return context.Students
                .Include(student => student.User)
                .ThenInclude(user => user.Role)
                .FirstOrDefaultAsync(student => student.User.Email == email);
        }
    }
}
