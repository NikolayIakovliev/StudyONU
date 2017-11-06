using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.StudentQueue;
using StudyONU.Logic.Infrastructure;
using StudyONU.Web.Models.StudentQueue;
using System.Threading.Tasks;

namespace StudyONU.Web.Controllers
{
    public class StudentsController : ApiController
    {
        private readonly IStudentQueueService service;
        private readonly IMapper mapper;

        public StudentsController(
            IStudentQueueService service,
            IMapper mapper
            )
        {
            this.service = service;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Register(StudentQueueCreateBindingModel model)
        {
            StudentQueueCreateDTO studentQueueCreateDTO = mapper.Map<StudentQueueCreateDTO>(model);

            ServiceMessage serviceMessage = await service.CreateAsync(studentQueueCreateDTO);

            return GenerateResponse(serviceMessage);
        }
    }
}
