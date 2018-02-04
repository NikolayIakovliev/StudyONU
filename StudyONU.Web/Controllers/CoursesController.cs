using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Course;
using StudyONU.Logic.DTO.Task;
using StudyONU.Logic.Infrastructure;
using StudyONU.Web.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Web.Controllers
{
    public class CoursesController : ApiController
    {
        private readonly ICourseService courseService;
        private readonly ITaskService taskService;
        private readonly DomainHelper domainHelper;

        public CoursesController(
            ICourseService courseService,
            ITaskService taskService,
            DomainHelper domainHelper
            )
        {
            this.courseService = courseService;
            this.taskService = taskService;
            this.domainHelper = domainHelper;
        }

        [HttpGet]
        public async Task<IActionResult> List(int specialityId, int courseNumber)
        {
            DataServiceMessage<IEnumerable<CourseShortListDTO>> serviceMessage = await courseService.GetByAsync(specialityId, courseNumber);

            return GenerateResponse(serviceMessage);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> Details(int id)
        {
            string email = GetUserEmail();

            DataServiceMessage<CourseDetailsDTO> serviceMessage = await courseService.GetAsync(id, email);
            
            if (serviceMessage.ActionResult == ServiceActionResult.Success)
            {
                serviceMessage.Data.LecturerPhotoPath = domainHelper.PrependDomain(serviceMessage.Data.LecturerPhotoPath);
            }

            return GenerateResponse(serviceMessage);
        }

        [HttpGet]
        [Route("published")]
        public async Task<IActionResult> ListPublished()
        {
            DataServiceMessage<IEnumerable<CourseListDTO>> serviceMessage = await courseService.GetPublishedAsync();

            return List(serviceMessage);
        }

        [HttpGet]
        [Authorize]
        [Route("my")]
        public async Task<IActionResult> ListAvailable()
        {
            string email = GetUserEmail();

            DataServiceMessage<IEnumerable<CourseListDTO>> serviceMessage = await courseService.GetByStudentEmailAsync(email);

            return List(serviceMessage);
        }

        [HttpGet]
        [Route("{id:int}/tasks")]
        public async Task<IActionResult> TaskList(int id)
        {
            string email = GetUserEmail();

            DataServiceMessage<IEnumerable<StudentTaskListDTO>> serviceMessage = await taskService.GetByCourseAndStudentAsync(id, email);
            
            if (serviceMessage.ActionResult == ServiceActionResult.Success)
            {
                foreach (StudentTaskListDTO item in serviceMessage.Data)
                {
                    if (item.FilePaths != null)
                    {
                        item.FilePaths = domainHelper.PrependDomain(item.FilePaths);
                    }
                }
            }

            return GenerateResponse(serviceMessage);
        }

        private IActionResult List(DataServiceMessage<IEnumerable<CourseListDTO>> serviceMessage)
        {
            if (serviceMessage.ActionResult == ServiceActionResult.Success)
            {
                foreach (CourseListDTO item in serviceMessage.Data)
                {
                    item.LecturerPhotoPath = domainHelper.PrependDomain(item.LecturerPhotoPath);
                }
            }

            return GenerateResponse(serviceMessage);
        }
    }
}
