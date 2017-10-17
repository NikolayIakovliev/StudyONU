using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Filters;
using StudyONU.Admin.Models.Course;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Course;
using StudyONU.Logic.Infrastructure;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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
            courseCreateDTO.LecturerEmail = User.FindFirst(JwtRegisteredClaimNames.Email).Value;

            ServiceMessage serviceMessage = await service.CreateAsync(courseCreateDTO);

            return GenerateResponse(serviceMessage);
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            Claim claim = User.Identities.First().FindFirst(JwtRegisteredClaimNames.Email);
            string email = claim?.Value;

            DataServiceMessage<IEnumerable<CourseListDTO>> serviceMessage = await service.GetByLecturerEmailAsync(email);

            return GenerateResponse(serviceMessage);
        }
    }
}
