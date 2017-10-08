using StudyONU.Core;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts.Repositories;

namespace StudyONU.Data.Repositories
{
    public class LecturerRepository : RepositoryBase<LecturerEntity>, ILecturerRepository
    {
        public LecturerRepository(StudyONUDbContext context)
            : base(context) { }
    }
}
