using StudyONU.Core;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts.Repositories;

namespace StudyONU.Data.Repositories
{
    public class CommentRepository : RepositoryBase<CommentEntity>, ICommentRepository
    {
        public CommentRepository(StudyONUDbContext context)
            : base(context) { }
    }
}
