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
        private readonly ILogger logger;

        public FakeEmailSender(ILogger logger)
        {
            this.logger = logger;
        }

        public async Task<ServiceMessage> SendEmailAsync(string to, string subject, string body)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

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
            //    logger.FillErrors(exception, errors);
            //}

            return new ServiceMessage
            {
                ActionResult = actionResult,
                Errors = errors
            };
        }
    }
}
