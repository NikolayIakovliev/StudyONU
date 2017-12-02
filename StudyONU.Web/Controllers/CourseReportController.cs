using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.CourseReport;
using StudyONU.Logic.Infrastructure;
using System.Threading.Tasks;

namespace StudyONU.Web.Controllers
{
    [Authorize]
    public class CourseReportController : ApiController
    {
        private readonly ICourseReportService service;

        public CourseReportController(ICourseReportService service)
        {
            this.service = service;
        }
        
        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            DataServiceMessage<CourseReportDTO> serviceMessage = await service.GetCourseReportAsync(id);

            return GenerateResponse(serviceMessage);
        }
    }
}
