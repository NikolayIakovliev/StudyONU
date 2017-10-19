using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Filters;
using StudyONU.Admin.Models.Guide;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Guide;
using StudyONU.Logic.Infrastructure;
using System.Collections.Generic;
using System.Security.Claims;
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
            DataServiceMessage<string> dataServiceMessage = await fileHelper.SaveFileAsync(model.File, "files/uploads");
            if (dataServiceMessage.ActionResult == ServiceActionResult.Success)
            {
                GuideCreateDTO guideCreateDTO = mapper.Map<GuideCreateDTO>(model, opts =>
                    opts.AfterMap((src, dest) =>
                    {
                        (dest as GuideCreateDTO).FilePath = dataServiceMessage.Data;
                    })
                );

                ServiceMessage serviceMessage = await service.CreateAsync(guideCreateDTO);

                return GenerateResponse(serviceMessage);
            }

            return GenerateResponse(dataServiceMessage);
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            string email = User.FindFirstValue(ClaimTypes.Email);
            DataServiceMessage<IEnumerable<GuideListDTO>> serviceMessage = await service.GetByLecturerEmailAsync(email);

            return GenerateResponse(serviceMessage);
        }
    }
}