using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Filters;
using StudyONU.Admin.Insrastructure;
using StudyONU.Admin.Models.Guide;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Guide;
using StudyONU.Logic.Infrastructure;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Admin.Controllers
{
    [LecturerAuthorize]
    public class GuidesController : ApiController
    {
        private readonly IGuideService service;
        private readonly IFileHelper fileHelper;
        private readonly IMapper mapper;

        public GuidesController(
            IGuideService service,
            IFileHelper fileHelper,
            IMapper mapper
            )
        {
            this.service = service;
            this.fileHelper = fileHelper;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] GuideCreateBindingModel model)
        {
            DataServiceMessage<string> dataServiceMessage = await fileHelper.SaveFileAsync(model.File, Paths.GuidesUploadPath);
            if (dataServiceMessage.ActionResult == ServiceActionResult.Success)
            {
                GuideCreateDTO guideCreateDTO = mapper.Map<GuideCreateDTO>(model);
                guideCreateDTO.FilePath = dataServiceMessage.Data;

                ServiceMessage serviceMessage = await service.CreateAsync(guideCreateDTO);

                return GenerateResponse(serviceMessage);
            }

            return GenerateResponse(dataServiceMessage);
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromForm] GuideEditBindingModel model)
        {
            string filePath = null;
            if (model.File != null)
            {
                DataServiceMessage<string> dataServiceMessage = await fileHelper.SaveFileAsync(model.File, Paths.GuidesUploadPath);
                if (dataServiceMessage.ActionResult == ServiceActionResult.Success)
                {
                    filePath = dataServiceMessage.Data;
                }
                else
                {
                    return GenerateResponse(dataServiceMessage);
                }
            }

            GuideEditDTO guideDTO = mapper.Map<GuideEditDTO>(model);
            guideDTO.FilePath = filePath;

            ServiceMessage serviceMessage = await service.EditAsync(guideDTO);

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

            DataServiceMessage<IEnumerable<GuideListDTO>> serviceMessage = await service.GetByLecturerEmailAsync(email);

            return GenerateResponse(serviceMessage);
        }
    }
}