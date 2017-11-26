using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Filters;
using StudyONU.Admin.Models.Course;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Course;
using StudyONU.Logic.Infrastructure;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Admin.Controllers
{
    [LecturerAuthorize]
    public class CoursesController : ApiController
    {
        private readonly ICourseService service;
        private readonly IMapper mapper;

        public CoursesController(ICourseService service, IMapper mapper)
        {
            this.service = service;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CourseCreateBindingModel model)
        {
            CourseCreateDTO courseCreateDTO = mapper.Map<CourseCreateDTO>(model);
            courseCreateDTO.LecturerEmail = GetUserEmail();

            ServiceMessage serviceMessage = await service.CreateAsync(courseCreateDTO);

            return GenerateResponse(serviceMessage);
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromBody] CourseEditBindingModel model)
        {
            CourseEditDTO specialityDTO = mapper.Map<CourseEditDTO>(model);
            ServiceMessage serviceMessage = await service.EditAsync(specialityDTO);

            return GenerateResponse(serviceMessage);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] int id)
        {
            ServiceMessage serviceMessage = await service.DeleteAsync(id);

            return GenerateResponse(serviceMessage);
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            string email = GetUserEmail();

            DataServiceMessage<IEnumerable<CourseListDTO>> serviceMessage = await service.GetByLecturerEmailAsync(email);

            return GenerateResponse(serviceMessage);
        }
    }
}
