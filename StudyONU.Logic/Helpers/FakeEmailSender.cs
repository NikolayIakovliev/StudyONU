using StudyONU.Logic.Contracts;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Threading.Tasks;

namespace StudyONU.Logic.Helpers
{
    public class FakeEmailSender : IEmailSender
    {
        private readonly IExceptionMessageBuilder exceptionMessageBuilder;

        public FakeEmailSender(IExceptionMessageBuilder exceptionMessageBuilder)
        {
            this.exceptionMessageBuilder = exceptionMessageBuilder;
        }

        public async Task<ServiceMessage> SendEmailAsync(string to, string subject, string body)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();

            //try
            //{
            //    using (MailMessage message = new MailMessage("mail@gmail.com", to, subject, body))
            //    {
            //        message.IsBodyHtml = true;

            //        using (SmtpClient smtpClient = new SmtpClient("localhost"))
            //        {
            //            await smtpClient.SendMailAsync(message);
            //        }
            //    }
            //}
            //catch (Exception exception)
            //{
            //    actionResult = ServiceActionResult.Exception;
            //    exceptionMessageBuilder.FillErrors(exception, errors);
            //}

            return new ServiceMessage
            {
                ActionResult = actionResult,
                Errors = errors
            };
        }
    }
}
