using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Course;
using StudyONU.Logic.DTO.Task;
using StudyONU.Logic.Infrastructure;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudyONU.Web.Controllers
{
    public class CoursesController : ApiController
    {
        private readonly ICourseService courseService;
        private readonly ITaskService taskService;

        public CoursesController(
            ICourseService courseService,
            ITaskService taskService)
        {
            this.courseService = courseService;
            this.taskService = taskService;
        }

        [HttpGet]
        [Route("published")]
        public async Task<IActionResult> ListPublished()
        {
            DataServiceMessage<IEnumerable<CourseListDTO>> serviceMessage = await courseService.GetPublishedAsync();

            return GenerateResponse(serviceMessage);
        }

        [HttpGet]
        [Authorize]
        [Route("my")]
        public async Task<IActionResult> ListAvailable()
        {
            string email = GetUserEmail();
            DataServiceMessage<IEnumerable<CourseListDTO>> serviceMessage = await courseService.GetByStudentEmailAsync(email);

            return GenerateResponse(serviceMessage);
        }

        [HttpGet]
        [Route("{id:int}/tasks")]
        public async Task<IActionResult> List(int id)
        {
            string email = GetUserEmail();

            DataServiceMessage<IEnumerable<TaskListDTO>> serviceMessage = await taskService.GetByCourseAndStudentAsync(id, email);

            // TODO
            // Use domain options
            if (serviceMessage.ActionResult == ServiceActionResult.Success)
            {
                foreach (TaskListDTO item in serviceMessage.Data)
                {
                    if (item.FilePaths != null)
                    {
                        item.FilePaths = item.FilePaths.Select(path => "http://localhost:28387" + path);
                    }
                }
            }

            return GenerateResponse(serviceMessage);
        }
    }
}
