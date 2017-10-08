using StudyONU.Core;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts.Repositories;

namespace StudyONU.Data.Repositories
{
    public class StudentRepository : RepositoryBase<StudentEntity>, IStudentRepository
    {
        public StudentRepository(StudyONUDbContext context)
            : base(context) { }
    }
}
