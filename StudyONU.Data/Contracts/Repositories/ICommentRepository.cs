using System.Collections.Generic;
using System.Threading.Tasks;
using StudyONU.Core.Entities;

namespace StudyONU.Data.Contracts.Repositories
{
    public interface ICommentRepository : IRepository<CommentEntity>
    {
        Task<IEnumerable<CommentEntity>> GetByTaskAndStudentAsync(int taskId, string studentEmail);
    }
}
