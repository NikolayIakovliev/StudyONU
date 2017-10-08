using StudyONU.Core;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts.Repositories;

namespace StudyONU.Data.Repositories
{
    public class TaskRepository : RepositoryBase<TaskEntity>, ITaskRepository
    {
        public TaskRepository(StudyONUDbContext context)
            : base(context) { }
    }
}
