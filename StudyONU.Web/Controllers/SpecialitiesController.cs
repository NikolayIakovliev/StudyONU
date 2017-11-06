using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Speciality;
using StudyONU.Logic.Infrastructure;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Web.Controllers
{
    public class SpecialitiesController : ApiController
    {
        private readonly ISpecialityService service;

        public SpecialitiesController(ISpecialityService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            DataServiceMessage<IEnumerable<SpecialityDTO>> serviceMessage = await service.GetAllAsync();

            return GenerateResponse(serviceMessage);
        }
    }
}
