using StudyONU.Core;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts.Repositories;

namespace StudyONU.Data.Repositories
{
    public class GuideRepository : RepositoryBase<GuideEntity>, IGuideRepository
    {
        public GuideRepository(StudyONUDbContext context)
            : base(context) { }
    }
}
