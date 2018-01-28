using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Filters;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.LecturerQueue;
using StudyONU.Logic.Infrastructure;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Admin.Controllers
{
    [AdminAuthorize]
    public class LecturerQueueController : ApiController
    {
        private readonly ILecturerQueueService service;
        private readonly IEmailSender emailSender;

        public LecturerQueueController(
            ILecturerQueueService service,
            IEmailSender emailSender
            )
        {
            this.service = service;
            this.emailSender = emailSender;
        }

        [HttpPost]
        [Route("{id:int}/approve")]
        public async Task<IActionResult> Approve(int id)
        {
            DataServiceMessage<LecturerRegisteredDTO> dataServiceMessage = await service.ApproveAsync(id);

            if (dataServiceMessage.ActionResult == ServiceActionResult.Success)
            {
                LecturerRegisteredDTO lecturerRegisteredDTO = dataServiceMessage.Data;

                ServiceMessage serviceMessage = await emailSender.SendEmailAsync(lecturerRegisteredDTO.Email, "Регистрация", "Ваш пароль: " + lecturerRegisteredDTO.GeneratedPassword);

                return GenerateResponse(serviceMessage);
            }

            return GenerateResponse(dataServiceMessage);
        }

        [HttpPost]
        [Route("{id:int}/disapprove")]
        public async Task<IActionResult> Disapprove(int id)
        {
            DataServiceMessage<LecturerRegisteredDTO> dataServiceMessage = await service.DisapproveAsync(id);

            if (dataServiceMessage.ActionResult == ServiceActionResult.Success)
            {
                LecturerRegisteredDTO lecturerRegisteredDTO = dataServiceMessage.Data;

                ServiceMessage serviceMessage = await emailSender.SendEmailAsync(lecturerRegisteredDTO.Email, "Регистрация", "Отказано в регистрации");

                return GenerateResponse(serviceMessage);
            }

            return GenerateResponse(dataServiceMessage);
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            DataServiceMessage<IEnumerable<LecturerQueueListDTO>> serviceMessage = await service.GetAwaitingAsync();

            return GenerateResponse(serviceMessage);
        }
    }
}
