using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Filters;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Report;
using StudyONU.Logic.Infrastructure;
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

        [HttpGet]
        [Route("sent")]
        public async Task<IActionResult> ListOfSent()
        {
            string email = GetUserEmail();

            DataServiceMessage<IEnumerable<ReportListDTO>> serviceMessage = await service.GetSentAsync(email);

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

        [HttpPost]
        [Route("check")]
        public async Task<IActionResult> StartChecking(int taskId, string studentEmail)
        {
            ServiceMessage serviceMessage = await service.ChangeOnCheckStateAsync(taskId, studentEmail);
            
            return GenerateResponse(serviceMessage);
        }
    }
}
