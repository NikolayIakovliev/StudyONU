using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Filters;
using StudyONU.Admin.Models.Lecturer;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Lecturer;
using StudyONU.Logic.Infrastructure;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Admin.Controllers
{
    [AdminAuthorize]
    public class LecturersController : ApiController
    {
        private readonly ILecturerService service;
        private readonly IFileHelper fileHelper;
        private readonly IEmailSender emailSender;
        private readonly IMapper mapper;

        public LecturersController(
            ILecturerService service,
            IFileHelper fileHelper,
            IEmailSender emailSender,
            IMapper mapper
            )
        {
            this.service = service;
            this.fileHelper = fileHelper;
            this.emailSender = emailSender;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            DataServiceMessage<IEnumerable<LecturerListDTO>> serviceMessage = await service.GetAllAsync();

            return GenerateResponse(serviceMessage);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] LecturerCreateBindingModel model)
        {
            string base64Image = model.Photo;

            DataServiceMessage<string> dataServiceMessage = await fileHelper.SaveByBase64Async(base64Image, "images/uploads");
            if (dataServiceMessage.ActionResult == ServiceActionResult.Success)
            {
                LecturerCreateDTO lecturerCreateDTO = mapper.Map<LecturerCreateDTO>(model, opts =>
                    opts.AfterMap((src, dest) =>
                    {
                        (dest as LecturerCreateDTO).PhotoPath = "/" + dataServiceMessage.Data;
                    })
                );
                dataServiceMessage = await service.CreateAsync(lecturerCreateDTO);
                if (dataServiceMessage.ActionResult == ServiceActionResult.Success)
                {
                    ServiceMessage serviceMessage = await emailSender.SendEmailAsync(model.Email, "StudyONU - registration", $"Welcome! Your password: {dataServiceMessage.Data}");
                }
            }

            return GenerateResponse(dataServiceMessage);
        }
    }
}
