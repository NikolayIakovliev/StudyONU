using StudyONU.Core;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts.Repositories;

namespace StudyONU.Data.Repositories
{
    public class StudentQueueRepository : RepositoryBase<StudentQueueEntity>, IStudentQueueRepository
    {
        public StudentQueueRepository(StudyONUDbContext context)
            : base(context) { }
    }
}
