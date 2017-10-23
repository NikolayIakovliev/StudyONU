using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Filters;
using StudyONU.Admin.Models.Speciality;
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
        private readonly IMapper mapper;

        public SpecialitiesController(
            ISpecialityService service,
            IMapper mapper
            )
        {
            this.service = service;
            this.mapper = mapper;
        }

        [HttpPost]
        [AdminAuthorize]
        public async Task<IActionResult> Create([FromBody] string name)
        {
            ServiceMessage serviceMessage = await service.CreateAsync(name);

            return GenerateResponse(serviceMessage);
        }

        [HttpPut]
        [AdminAuthorize]
        public async Task<IActionResult> Edit([FromBody] SpecialityBindingModel model)
        {
            SpecialityDTO specialityDTO = mapper.Map<SpecialityDTO>(model);
            ServiceMessage serviceMessage = await service.EditAsync(specialityDTO);

            return GenerateResponse(serviceMessage);
        }

        [HttpDelete]
        [AdminAuthorize]
        public async Task<IActionResult> Delete([FromBody] int id)
        {
            ServiceMessage serviceMessage = await service.DeleteAsync(id);

            return GenerateResponse(serviceMessage);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> List()
        {
            DataServiceMessage<IEnumerable<SpecialityDTO>> serviceMessage = await service.GetAllAsync();

            return GenerateResponse(serviceMessage);
        }
    }
}
