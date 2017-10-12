using StudyONU.Core;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts.Repositories;

namespace StudyONU.Data.Repositories
{
    public class RoleRepository : RepositoryBase<RoleEntity>, IRoleRepository
    {
        public RoleRepository(StudyONUDbContext context)
            : base(context) { }
    }
}
