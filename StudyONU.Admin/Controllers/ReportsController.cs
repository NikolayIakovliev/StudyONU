using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Filters;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Report;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Admin.Controllers
{
    [LecturerAuthorize]
    public class ReportsController : ApiController
    {
        private readonly IReportService service;

        public ReportsController(IReportService service)
        {
            this.service = service;
        }

        [HttpPut]
        [Route("check")]
        public async Task<IActionResult> StartChecking(int taskId, string studentEmail)
        {
            ServiceMessage serviceMessage = await service.ChangeOnCheckStateAsync(taskId, studentEmail);
            
            return GenerateResponse(serviceMessage);
        }

        [HttpPut]
        [Route("accept")]
        public async Task<IActionResult> Accept(int taskId, string studentEmail, decimal mark)
        {
            ServiceMessage serviceMessage = await service.AcceptAsync(taskId, studentEmail, mark);

            return GenerateResponse(serviceMessage);
        }

        [HttpPut]
        [Route("reject")]
        public async Task<IActionResult> Reject(int taskId, string studentEmail)
        {
            ServiceMessage serviceMessage = await service.RejectAsync(taskId, studentEmail);

            return GenerateResponse(serviceMessage);
        }

        [HttpGet]
        [Route("sent")]
        public Task<IActionResult> SentList()
        {
            return List(service.GetSentAsync);
        }

        [HttpGet]
        [Route("oncheck")]
        public Task<IActionResult> OnCheckList()
        {
            return List(service.GetOnCheckAsync);
        }

        private async Task<IActionResult> List(Func<string, Task<DataServiceMessage<IEnumerable<ReportListDTO>>>> factory)
        {
            string email = GetUserEmail();

            DataServiceMessage<IEnumerable<ReportListDTO>> serviceMessage = await factory(email);

            // TODO
            // Use domain options
            if (serviceMessage.ActionResult == ServiceActionResult.Success)
            {
                foreach (ReportListDTO item in serviceMessage.Data)
                {
                    item.StudentPhoto = "http://localhost:22107" + item.StudentPhoto;
                    if (item.FilePath != null)
                    {
                        item.FilePath = "http://localhost:22107" + item.FilePath;
                    }
                }
            }

            return GenerateResponse(serviceMessage);
        }
    }
}
