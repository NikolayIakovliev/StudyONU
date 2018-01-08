using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Report;
using StudyONU.Logic.Infrastructure;
using StudyONU.Web.Helpers;
using StudyONU.Web.Models.Report;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Web.Controllers
{
    [Authorize]
    public class ReportsController : ApiController
    {
        private readonly IReportService service;
        private readonly IMapper mapper;
        private readonly ProxyHelper proxyHelper;

        public ReportsController(
            IReportService service,
            IMapper mapper,
            ProxyHelper proxyHelper
            )
        {
            this.service = service;
            this.mapper = mapper;
            this.proxyHelper = proxyHelper;
        }

        [HttpPost]
        public async Task<IActionResult> Send([FromForm] ReportCreateBindingModel model)
        {
            IEnumerable<string> paths = await proxyHelper.SendFilesAsync(model.Files);

            if (paths != null)
            {
                ReportCreateDTO reportCreateDTO = mapper.Map<ReportCreateDTO>(model);
                reportCreateDTO.FilePaths = paths;
                string email = GetUserEmail();

                ServiceMessage serviceMessage = await service.SendAsync(reportCreateDTO, email);

                return GenerateResponse(serviceMessage);
            }

            return StatusCode(StatusCodes.Status500InternalServerError);
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
