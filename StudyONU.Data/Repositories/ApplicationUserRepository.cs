using StudyONU.Core;
using StudyONU.Core.Identity;
using StudyONU.Data.Contracts.Repositories;

namespace StudyONU.Data.Repositories
{
    public class ApplicationUserRepository : RepositoryBase<ApplicationUser>, IApplicationUserRepository
    {
        public ApplicationUserRepository(StudyONUDbContext context)
            : base(context) { }
    }
}
