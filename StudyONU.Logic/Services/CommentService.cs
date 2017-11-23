using AutoMapper;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Comment;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Logic.Services
{
    public class CommentService : ServiceBase, ICommentService
    {
        public CommentService(
            IUnitOfWork unitOfWork, 
            IMapper mapper,
            ILogger logger) 
            : base(unitOfWork, mapper, logger) { }

        public async Task<DataServiceMessage<IEnumerable<CommentListDTO>>> GetByTaskAndStudentAsync(int taskId, string studentEmail)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();
            IEnumerable<CommentListDTO> data = null;

            try
            {
                IEnumerable<CommentEntity> commentEntities = await unitOfWork.Comments.GetByTaskAndStudentAsync(taskId, studentEmail);
                data = mapper.Map<IEnumerable<CommentListDTO>>(commentEntities);
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
                actionResult = ServiceActionResult.Exception;
                errors.AddExceptionError();
            }

            return new DataServiceMessage<IEnumerable<CommentListDTO>>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }
    }
}
