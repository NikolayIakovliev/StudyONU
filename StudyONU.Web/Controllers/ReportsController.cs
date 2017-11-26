using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Report;
using StudyONU.Logic.Infrastructure;
using StudyONU.Web.Models.Report;
using System.Threading.Tasks;

namespace StudyONU.Web.Controllers
{
    [Authorize]
    public class ReportsController : ApiController
    {
        private readonly IReportService service;
        private readonly IFileHelper fileHelper;
        private readonly IMapper mapper;

        public ReportsController(
            IReportService service,
            IFileHelper fileHelper,
            IMapper mapper
            )
        {
            this.service = service;
            this.fileHelper = fileHelper;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] ReportCreateBindingModel model)
        {
            DataServiceMessage<string> dataServiceMessage = await fileHelper.SaveFileAsync(model.File, ReportsUploadPath);

            if (dataServiceMessage.ActionResult == ServiceActionResult.Success)
            {
                ReportCreateDTO reportCreateDTO = mapper.Map<ReportCreateDTO>(model);
                reportCreateDTO.FilePath = dataServiceMessage.Data;
                string email = GetUserEmail();

                ServiceMessage serviceMessage = await service.CreateAsync(reportCreateDTO, email);

                return GenerateResponse(serviceMessage);
            }

            return GenerateResponse(dataServiceMessage);
        }

        [HttpPut]
        [Route("{taskId:int}/cancel")]
        public async Task<IActionResult> Cancel(int taskId)
        {
            string email = GetUserEmail();

            ServiceMessage serviceMessage = await service.CancelAsync(taskId, email);

            return GenerateResponse(serviceMessage);
        }
    }
}
