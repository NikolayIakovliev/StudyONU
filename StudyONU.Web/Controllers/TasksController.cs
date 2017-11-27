using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Task;
using StudyONU.Logic.Infrastructure;
using StudyONU.Web.Helpers;
using System.Threading.Tasks;

namespace StudyONU.Web.Controllers
{
    [Authorize]
    public class TasksController : ApiController
    {
        private readonly ITaskService service;
        private readonly DomainHelper domainHelper;

        public TasksController(ITaskService service, DomainHelper domainHelper)
        {
            this.service = service;
            this.domainHelper = domainHelper;
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> Details(int id)
        {
            string email = GetUserEmail();

            DataServiceMessage<TaskDetailsDTO> serviceMessage = await service.GetAsync(id, email);
            
            if (serviceMessage.ActionResult == ServiceActionResult.Success)
            {
                if (serviceMessage.Data.FilePaths != null)
                {
                    serviceMessage.Data.FilePaths = domainHelper.PrependDomain(serviceMessage.Data.FilePaths);
                }
            }

            return GenerateResponse(serviceMessage);
        }
    }
}
