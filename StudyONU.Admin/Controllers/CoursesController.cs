using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Filters;
using StudyONU.Admin.Models.Course;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Course;
using StudyONU.Logic.Infrastructure;
using System.Collections.Generic;
using System.Security.Claims;
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
            courseCreateDTO.LecturerEmail = User.FindFirstValue(ClaimTypes.Email);

            ServiceMessage serviceMessage = await service.CreateAsync(courseCreateDTO);

            return GenerateResponse(serviceMessage);
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            string email = User.FindFirstValue(ClaimTypes.Email);
            DataServiceMessage<IEnumerable<CourseListDTO>> serviceMessage = await service.GetByLecturerEmailAsync(email);

            return GenerateResponse(serviceMessage);
        }
    }
}
