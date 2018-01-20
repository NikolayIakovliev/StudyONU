using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using StudyONU.Admin.Filters;
using StudyONU.Admin.Options;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Infrastructure;
using System;
using System.Threading.Tasks;

namespace StudyONU.Admin.Controllers
{
    [LecturerAuthorize]
    public class FeedbacksController : ApiController
    {
        private readonly IEmailSender emailSender;
        private readonly FeedbackOptions options;

        public FeedbacksController(IEmailSender emailSender, IOptions<FeedbackOptions> options)
        {
            this.emailSender = emailSender;
            this.options = options.Value;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] string text)
        {
            ServiceMessage serviceMessage = await emailSender.SendEmailAsync(
                options.DevEmail,
                options.Subject,
                text.Replace(Environment.NewLine, "<br />")
                );

            return GenerateResponse(serviceMessage);
        }
    }
}
