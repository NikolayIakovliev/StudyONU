using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Filters;
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

        public CommentsController(ICommentService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<IActionResult> List([FromQuery] int taskId, [FromQuery] string studentEmail)
        {
            DataServiceMessage<IEnumerable<CommentListDTO>> serviceMessage = await service.GetByTaskAndStudentAsync(taskId, studentEmail);

            return GenerateResponse(serviceMessage);
        }
    }
}
