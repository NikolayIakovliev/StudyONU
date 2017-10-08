using StudyONU.Core;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts.Repositories;

namespace StudyONU.Data.Repositories
{
    public class SpecialityRepository : RepositoryBase<SpecialityEntity>, ISpecialityRepository
    {
        public SpecialityRepository(StudyONUDbContext context)
            : base(context) { }
    }
}
