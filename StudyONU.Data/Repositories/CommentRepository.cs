using Microsoft.EntityFrameworkCore;
using StudyONU.Core;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudyONU.Data.Repositories
{
    public class CommentRepository : RepositoryBase<CommentEntity>, ICommentRepository
    {
        public CommentRepository(StudyONUDbContext context)
            : base(context) { }

        public async Task<IEnumerable<CommentEntity>> GetByTaskAndStudentAsync(int taskId, string studentEmail)
        {
            return await context.Comments
                .Include(comment => comment.Sender)
                .Where(comment => comment.TaskId == taskId && comment.Student.User.Email == studentEmail)
                .OrderBy(comment => comment.DateCreated)
                .ToListAsync();
        }
    }
}
