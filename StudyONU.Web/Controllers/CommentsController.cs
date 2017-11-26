using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Comment;
using StudyONU.Logic.Infrastructure;
using StudyONU.Web.Models.Comment;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Web.Controllers
{
    public class CommentsController : ApiController
    {
        private readonly ICommentService service;
        private readonly IMapper mapper;

        public CommentsController(ICommentService service, IMapper mapper)
        {
            this.service = service;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CommentCreateBindingModel model)
        {
            string email = GetUserEmail();

            CommentCreateDTO comment = mapper.Map<CommentCreateDTO>(model);
            comment.SenderEmail = email;
            comment.StudentEmail = email;

            ServiceMessage serviceMessage = await service.CreateAsync(comment);

            return GenerateResponse(serviceMessage);
        }

        [HttpGet]
        public async Task<IActionResult> List([FromQuery] int taskId)
        {
            string email = GetUserEmail();

            DataServiceMessage<IEnumerable<CommentListDTO>> serviceMessage = await service.GetByTaskAndStudentAsync(taskId, email);

            return GenerateResponse(serviceMessage);
        }
    }
}
