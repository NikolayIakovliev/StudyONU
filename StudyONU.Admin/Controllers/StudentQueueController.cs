using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Models.StudentQueue;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Course;
using StudyONU.Logic.DTO.StudentQueue;
using StudyONU.Logic.Infrastructure;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Admin.Controllers
{
    public class StudentQueueController : ApiController
    {
        private readonly IStudentQueueService studentService;
        private readonly ICourseService courseService;
        private readonly IEmailSender emailSender;

        public StudentQueueController(
            IStudentQueueService studentService,
            ICourseService courseService,
            IEmailSender emailSender
            )
        {
            this.studentService = studentService;
            this.courseService = courseService;
            this.emailSender = emailSender;
        }

        [HttpPost]
        [Route("approve")]
        public async Task<IActionResult> Approve([FromBody] StudentQueueApproveBindingModel model)
        {
            DataServiceMessage<StudentRegisteredDTO> dataServiceMessage = await studentService.ApproveAsync(model.Id, model.CourseIds);

            if (dataServiceMessage.ActionResult == ServiceActionResult.Success)
            {
                StudentRegisteredDTO studentRegisteredDTO = dataServiceMessage.Data;

                ServiceMessage serviceMessage = await emailSender.SendEmailAsync(studentRegisteredDTO.Email, "Регистрация", "Ваш пароль: " + studentRegisteredDTO.GeneratedPassword);

                return GenerateResponse(serviceMessage);
            }

            return GenerateResponse(dataServiceMessage);
        }

        [HttpPost]
        [Route("{id:int}/disapprove")]
        public async Task<IActionResult> Disapprove(int id)
        {
            DataServiceMessage<StudentRegisteredDTO> dataServiceMessage = await studentService.DisapproveAsync(id);

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
            DataServiceMessage<IEnumerable<StudentQueueListDTO>> serviceMessage = await studentService.GetUnapprovedAsync();
            if (serviceMessage.ActionResult == ServiceActionResult.Success)
            {
                foreach (StudentQueueListDTO student in serviceMessage.Data)
                {
                    student.PhotoPath = domain + student.PhotoPath;
                }
            }

            return GenerateResponse(serviceMessage);
        }

        [HttpGet]
        [Route("{id:int}/courses")]
        public async Task<IActionResult> RecommendedCourseList(int id)
        {
            DataServiceMessage<IEnumerable<CourseListDTO>> serviceMessage = await courseService.GetRecommendedAsync(id);

            return GenerateResponse(serviceMessage);
        }
    }
}
