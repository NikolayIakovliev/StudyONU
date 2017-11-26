using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Guide;
using StudyONU.Logic.Infrastructure;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Web.Controllers
{
    public class GuidesController : ApiController
    {
        private readonly IGuideService service;
        private readonly IMapper mapeper;

        public GuidesController(IGuideService service, IMapper mapeper)
        {
            this.service = service;
            this.mapeper = mapeper;
        }

        [HttpGet]
        public async Task<IActionResult> List(int courseId)
        {
            string email = GetUserEmail();

            DataServiceMessage<IEnumerable<StudentGuideListDTO>> serviceMessage = await service.GetByCourseAndStudentAsync(courseId, email);

            // TODO
            // Use domain options
            if (serviceMessage.ActionResult == ServiceActionResult.Success)
            {
                foreach (StudentGuideListDTO item in serviceMessage.Data)
                {
                    item.FilePath = "http://localhost:28387" + item.FilePath;
                }
            }

            return GenerateResponse(serviceMessage);
        }
    }
}
