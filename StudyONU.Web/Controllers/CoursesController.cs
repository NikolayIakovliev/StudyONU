using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Course;
using StudyONU.Logic.Infrastructure;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Web.Controllers
{
    public class CoursesController : ApiController
    {
        private readonly ICourseService service;

        public CoursesController(ICourseService service)
        {
            this.service = service;
        }

        [HttpGet]
        [Route("published")]
        public async Task<IActionResult> ListPublished()
        {
            DataServiceMessage<IEnumerable<CourseListDTO>> serviceMessage = await service.GetPublishedAsync();

            return GenerateResponse(serviceMessage);
        }

        [HttpGet]
        [Authorize]
        [Route("my")]
        public async Task<IActionResult> ListAvailable()
        {
            string email = GetUserEmail();
            DataServiceMessage<IEnumerable<CourseListDTO>> serviceMessage = await service.GetByStudentEmailAsync(email);

            return GenerateResponse(serviceMessage);
        }
    }
}
