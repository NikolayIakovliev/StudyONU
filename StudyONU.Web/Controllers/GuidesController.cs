using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Guide;
using StudyONU.Logic.Infrastructure;
using StudyONU.Web.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Web.Controllers
{
    public class GuidesController : ApiController
    {
        private readonly IGuideService service;
        private readonly IMapper mapeper;
        private readonly DomainHelper domainHelper;

        public GuidesController(
            IGuideService service, 
            IMapper mapeper,
            DomainHelper domainHelper
            )
        {
            this.service = service;
            this.mapeper = mapeper;
            this.domainHelper = domainHelper;
        }

        [HttpGet]
        public async Task<IActionResult> List(int courseId)
        {
            string email = GetUserEmail();

            DataServiceMessage<IEnumerable<StudentGuideListDTO>> serviceMessage = await service.GetByCourseAndStudentAsync(courseId, email);
            
            if (serviceMessage.ActionResult == ServiceActionResult.Success)
            {
                foreach (StudentGuideListDTO item in serviceMessage.Data)
                {
                    item.FilePath = domainHelper.PrependDomain(item.FilePath);
                }
            }

            return GenerateResponse(serviceMessage);
        }
    }
}
