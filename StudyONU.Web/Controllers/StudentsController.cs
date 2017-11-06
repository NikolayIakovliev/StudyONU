using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts;
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
        private readonly IFileHelper fileHelper;

        public StudentsController(
            IStudentQueueService service,
            IMapper mapper,
            IFileHelper fileHelper
            )
        {
            this.service = service;
            this.mapper = mapper;
            this.fileHelper = fileHelper;
        }

        [HttpPost]
        public async Task<IActionResult> Register(StudentQueueCreateBindingModel model)
        {
            DataServiceMessage<string> dataServiceMessage = await fileHelper.SaveFileAsync(model.Photo, StudentsImageUploadPath);
            if (dataServiceMessage.ActionResult == ServiceActionResult.Success)
            {
                StudentQueueCreateDTO studentQueueCreateDTO = mapper.Map<StudentQueueCreateDTO>(model);
                studentQueueCreateDTO.PhotoPath = dataServiceMessage.Data;

                ServiceMessage serviceMessage = await service.CreateAsync(studentQueueCreateDTO);
                
                return GenerateResponse(serviceMessage);
            }

            return GenerateResponse(dataServiceMessage);
        }
    }
}
