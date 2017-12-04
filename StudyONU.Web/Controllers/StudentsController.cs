using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.StudentQueue;
using StudyONU.Logic.Infrastructure;
using StudyONU.Web.Helpers;
using StudyONU.Web.Models.StudentQueue;
using System.Threading.Tasks;

namespace StudyONU.Web.Controllers
{
    public class StudentsController : ApiController
    {
        private readonly IStudentQueueService service;
        private readonly IMapper mapper;
        private readonly ProxyHelper proxyHelper;

        public StudentsController(
            IStudentQueueService service,
            IMapper mapper,
            ProxyHelper proxyHelper
            )
        {
            this.service = service;
            this.mapper = mapper;
            this.proxyHelper = proxyHelper;
        }

        [HttpPost]
        public async Task<IActionResult> Register(StudentQueueCreateBindingModel model)
        {
            string path = await proxyHelper.SendFileAsync(model.Photo);
            if (path != null)
            {
                StudentQueueCreateDTO studentQueueCreateDTO = mapper.Map<StudentQueueCreateDTO>(model);
                studentQueueCreateDTO.PhotoPath = path;

                ServiceMessage serviceMessage = await service.CreateAsync(studentQueueCreateDTO);
                
                return GenerateResponse(serviceMessage);
            }

            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
