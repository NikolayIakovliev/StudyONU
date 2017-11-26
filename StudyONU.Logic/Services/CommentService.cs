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

        public async Task<ServiceMessage> CreateAsync(CommentCreateDTO commentDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            try
            {
                TaskEntity taskEntity = await unitOfWork.Tasks.GetAsync(commentDTO.TaskId);
                UserEntity sender = await unitOfWork.Users.GetByEmailAsync(commentDTO.SenderEmail);
                StudentEntity studentEntity = await unitOfWork.Students.GetByEmailAsync(commentDTO.StudentEmail);

                bool ok =
                    taskEntity != null &&
                    sender != null &&
                    studentEntity != null;

                if (ok)
                {
                    CommentEntity commentEntity = mapper.Map<CommentEntity>(commentDTO);
                    commentEntity.SenderId = sender.Id;
                    commentEntity.StudentId = studentEntity.Id;

                    await unitOfWork.Comments.AddAsync(commentEntity);
                    await unitOfWork.CommitAsync();
                }
                else
                {
                    actionResult = ServiceActionResult.NotFound;
                    errors.AddCommonError();
                }
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
                actionResult = ServiceActionResult.Exception;
                errors.AddExceptionError();
            }

            return new ServiceMessage
            {
                ActionResult = actionResult,
                Errors = errors
            };
        }

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
