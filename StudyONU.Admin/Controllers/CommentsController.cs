using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Filters;
using StudyONU.Admin.Models.Comment;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Comment;
using StudyONU.Logic.Infrastructure;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Admin.Controllers
{
    [LecturerAuthorize]
    public class CommentsController : ApiController
    {
        private readonly ICommentService service;
        private readonly IEmailSender emailSender;
        private readonly IMapper mapper;

        public CommentsController(
            ICommentService service,
            IEmailSender emailSender,
            IMapper mapper
            )
        {
            this.service = service;
            this.emailSender = emailSender;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CommentCreateBindingModel model)
        {
            CommentCreateDTO comment = mapper.Map<CommentCreateDTO>(model);
            comment.SenderEmail = GetUserEmail();

            DataServiceMessage<CommentInfoDTO> dataServiceMessage = await service.CreateAsync(comment);
            if (dataServiceMessage.ActionResult == ServiceActionResult.Success)
            {
                CommentInfoDTO info = dataServiceMessage.Data;
                ServiceMessage serviceMessage = await emailSender.SendEmailAsync(info.StudentEmail, $"{info.CourseName} - {info.TaskName}", "Преподаватель оставил комментарий");

                return GenerateResponse(serviceMessage);
            }

            return GenerateResponse(dataServiceMessage);
        }

        [HttpGet]
        public async Task<IActionResult> List([FromQuery] int taskId, [FromQuery] string studentEmail)
        {
            DataServiceMessage<IEnumerable<CommentListDTO>> serviceMessage = await service.GetByTaskAndStudentAsync(taskId, studentEmail);

            return GenerateResponse(serviceMessage);
        }
    }
}
