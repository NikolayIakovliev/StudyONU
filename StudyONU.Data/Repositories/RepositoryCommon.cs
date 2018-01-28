using StudyONU.Core;
using StudyONU.Data.Contracts.Repositories;

namespace StudyONU.Data.Repositories
{
    public class RepositoryCommon<TEntity> : RepositoryBase<TEntity>, IRepository<TEntity>
        where TEntity : class
    {
        public RepositoryCommon(StudyONUDbContext context) : base(context)
        {
        }
    }
}
