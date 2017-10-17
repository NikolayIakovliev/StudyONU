using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Models.Course;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Course;
using StudyONU.Logic.Infrastructure;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace StudyONU.Admin.Controllers
{
    public class CourseController : ApiController
    {
        private readonly ICourseService service;
        private readonly IMapper mapper;

        public CourseController(ICourseService service, IMapper mapper)
        {
            this.service = service;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CourseCreateBindingModel model)
        {
            CourseCreateDTO courseCreateDTO = mapper.Map<CourseCreateDTO>(model);
            courseCreateDTO.LecturerEmail = User.FindFirst(JwtRegisteredClaimNames.Email).Value;

            ServiceMessage serviceMessage = await service.CreateAsync(courseCreateDTO);

            return GenerateResponse(serviceMessage);
        }
    }
}
