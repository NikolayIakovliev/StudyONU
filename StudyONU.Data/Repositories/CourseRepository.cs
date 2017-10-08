using StudyONU.Core;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts.Repositories;

namespace StudyONU.Data.Repositories
{
    public class CourseRepository : RepositoryBase<CourseEntity>, ICourseRepository
    {
        public CourseRepository(StudyONUDbContext context)
            : base(context) { }
    }
}
