using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Task;
using StudyONU.Logic.Infrastructure;
using System.Threading.Tasks;

namespace StudyONU.Web.Controllers
{
    [Authorize]
    public class TasksController : ApiController
    {
        private readonly ITaskService service;

        public TasksController(ITaskService service)
        {
            this.service = service;
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> Details(int id)
        {
            string email = GetUserEmail();

            DataServiceMessage<TaskDetailsDTO> serviceMessage = await service.GetAsync(id, email);

            return GenerateResponse(serviceMessage);
        }
    }
}
