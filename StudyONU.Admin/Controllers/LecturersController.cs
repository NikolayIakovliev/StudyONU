﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Filters;
using StudyONU.Admin.Insrastructure;
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

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] LecturerCreateBindingModel model)
        {
            DataServiceMessage<string> dataServiceMessage = await fileHelper.SaveFileAsync(model.Photo, Paths.LecturersImageUploadPath);
            if (dataServiceMessage.ActionResult == ServiceActionResult.Success)
            {
                LecturerCreateDTO lecturerCreateDTO = mapper.Map<LecturerCreateDTO>(model);
                lecturerCreateDTO.PhotoPath = dataServiceMessage.Data;

                dataServiceMessage = await service.CreateAsync(lecturerCreateDTO);
                if (dataServiceMessage.ActionResult == ServiceActionResult.Success)
                {
                    // TODO
                    // Create IMessageBuilder
                    ServiceMessage serviceMessage = await emailSender.SendEmailAsync(model.Email, "StudyONU - registration", $"Welcome! Your password: {dataServiceMessage.Data}");
                }
            }

            return GenerateResponse(dataServiceMessage);
        }

        [HttpPut]
        [AdminAuthorize]
        public async Task<IActionResult> Edit([FromBody] LecturerEditBindingModel model)
        {
            LecturerEditDTO lecturerEditDTO = mapper.Map<LecturerEditDTO>(model);
            ServiceMessage serviceMessage = await service.EditAsync(lecturerEditDTO);

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
        public async Task<IActionResult> List()
        {
            DataServiceMessage<IEnumerable<LecturerListDTO>> serviceMessage = await service.GetAllAsync();

            return GenerateResponse(serviceMessage);
        }
    }
}
