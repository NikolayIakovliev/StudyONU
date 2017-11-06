using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.StudentQueue;
using StudyONU.Logic.Infrastructure;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Admin.Controllers
{
    public class StudentQueueController : ApiController
    {
        private readonly IStudentQueueService service;
        private readonly IEmailSender emailSender;

        public StudentQueueController(
            IStudentQueueService service,
            IEmailSender emailSender
            )
        {
            this.service = service;
            this.emailSender = emailSender;
        }

        [HttpPost]
        [Route("approve")]
        public async Task<IActionResult> Approve([FromQuery] int id)
        {
            DataServiceMessage<StudentRegisteredDTO> dataServiceMessage = await service.ApproveAsync(id);

            if (dataServiceMessage.ActionResult == ServiceActionResult.Success)
            {
                StudentRegisteredDTO studentRegisteredDTO = dataServiceMessage.Data;

                ServiceMessage serviceMessage = await emailSender.SendEmailAsync(studentRegisteredDTO.Email, "Регистрация", "Ваш пароль: " + studentRegisteredDTO.GeneratedPassword);

                return GenerateResponse(serviceMessage);
            }

            return GenerateResponse(dataServiceMessage);
        }

        [HttpPost]
        [Route("disapprove")]
        public async Task<IActionResult> Disapprove([FromQuery] int id)
        {
            DataServiceMessage<StudentRegisteredDTO> dataServiceMessage = await service.DisapproveAsync(id);

            if (dataServiceMessage.ActionResult == ServiceActionResult.Success)
            {
                StudentRegisteredDTO studentRegisteredDTO = dataServiceMessage.Data;

                ServiceMessage serviceMessage = await emailSender.SendEmailAsync(studentRegisteredDTO.Email, "Регистрация", "Отказано в регистрации");

                return GenerateResponse(serviceMessage);
            }

            return GenerateResponse(dataServiceMessage);
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            // TODO
            // Use options instead
            const string domain = "http://localhost:22107";
            DataServiceMessage<IEnumerable<StudentQueueListDTO>> serviceMessage = await service.GetUnapprovedAsync();
            if (serviceMessage.ActionResult == ServiceActionResult.Success)
            {
                foreach (StudentQueueListDTO student in serviceMessage.Data)
                {
                    student.PhotoPath = domain + student.PhotoPath;
                }
            }

            return GenerateResponse(serviceMessage);
        }
    }
}
