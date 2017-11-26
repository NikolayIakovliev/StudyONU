using StudyONU.Logic.DTO.Comment;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Logic.Contracts.Services
{
    public interface ICommentService : IDisposable
    {
        Task<ServiceMessage> CreateAsync(CommentCreateDTO commentDTO);

        Task<DataServiceMessage<IEnumerable<CommentListDTO>>> GetByTaskAndStudentAsync(int taskId, string studentEmail);
    }
}
