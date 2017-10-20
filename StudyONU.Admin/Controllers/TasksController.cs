using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Filters;
using StudyONU.Admin.Models.Task;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Task;
using StudyONU.Logic.Infrastructure;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudyONU.Admin.Controllers
{
    [LecturerAuthorize]
    public class TasksController : ApiController
    {
        private readonly ITaskService service;
        private readonly IFileHelper fileHelper;
        private readonly IMapper mapper;

        public TasksController(
            ITaskService service,
            IFileHelper fileHelper,
            IMapper mapper
            )
        {
            this.service = service;
            this.fileHelper = fileHelper;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] TaskCreateBindingModel model)
        {
            IEnumerable<IFormFile> files = model.Files;
            IEnumerable<string> filePaths = null;

            if (files != null && files.Any())
            {
                DataServiceMessage<IEnumerable<string>> dataServiceMessage = await fileHelper.SaveFilesAsync(files, TasksUploadPath);
                switch (dataServiceMessage.ActionResult)
                {
                    case ServiceActionResult.Success:
                        filePaths = dataServiceMessage.Data;
                        break;
                    default:
                        return GenerateResponse(dataServiceMessage);
                }
            }

            TaskCreateDTO taskCreateDTO = mapper.Map<TaskCreateDTO>(model, opts =>
                opts.AfterMap((src, dest) =>
                {
                    (dest as TaskCreateDTO).FilePaths = filePaths;
                })
            );

            ServiceMessage serviceMessage = await service.CreateAsync(taskCreateDTO);

            return GenerateResponse(serviceMessage);
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            string email = GetUserEmail();

            DataServiceMessage<IEnumerable<TaskListDTO>> serviceMessage = await service.GetByLecturerEmailAsync(email);

            return GenerateResponse(serviceMessage);
        }
    }
}