using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Filters;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Speciality;
using StudyONU.Logic.Infrastructure;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Admin.Controllers
{
    public class SpecialitiesController : ApiController
    {
        private readonly ISpecialityService service;

        public SpecialitiesController(ISpecialityService service)
        {
            this.service = service;
        }

        [HttpPost]
        [AdminAuthorize]
        public async Task<IActionResult> Create([FromBody] string name)
        {
            ServiceMessage serviceMessage = await service.CreateAsync(name);

            return GenerateResponse(serviceMessage);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> List()
        {
            DataServiceMessage<IEnumerable<SpecialityListDTO>> serviceMessage = await service.GetAllAsync();

            return GenerateResponse(serviceMessage);
        }
    }
}
