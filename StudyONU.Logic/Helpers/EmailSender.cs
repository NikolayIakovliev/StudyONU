using MailKit.Net.Smtp;
using MimeKit;
using StudyONU.Data.Contracts;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Infrastructure;
using System;
using System.Threading.Tasks;

namespace StudyONU.Logic.Helpers
{
    // TODO
    // Use options
    public class EmailSender : IEmailSender
    {
        private const string From = "nickose777@gmail.com";
        private const string Password = "Nick2397";

        private readonly IUnitOfWork unitOfWork;
        private readonly ILogger logger;

        public EmailSender(
            IUnitOfWork unitOfWork,
            ILogger logger
            )
        {
            this.unitOfWork = unitOfWork;
            this.logger = logger;
        }

        public async Task<ServiceMessage> SendEmailAsync(string to, string subject, string body)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            try
            {
                string FromAdressTitle = "Name of sender here";
                string ToAdressTitle = "Name of receiver here";

                string SmtpServer = "smtp.gmail.com";
                int SmtpPortNumber = 587;

                MimeMessage mimeMessage = new MimeMessage();
                mimeMessage.From.Add(new MailboxAddress(FromAdressTitle, From));
                mimeMessage.To.Add(new MailboxAddress(ToAdressTitle, to));
                mimeMessage.Subject = subject;
                mimeMessage.Body = new TextPart("plain")
                {
                    Text = body
                };

                using (SmtpClient client = new SmtpClient())
                {
                    await client.ConnectAsync(SmtpServer, SmtpPortNumber, false);

                    client.AuthenticationMechanisms.Remove("XOAUTH2");

                    await client.AuthenticateAsync(From, Password);

                    await client.SendAsync(mimeMessage);

                    await client.DisconnectAsync(true);
                }
            }
            catch (Exception exception)
            {
                actionResult = ServiceActionResult.Exception;
                logger.Fatal(exception);
            }

            return new ServiceMessage
            {
                ActionResult = actionResult,
                Errors = errors
            };
        }

        public void Dispose()
        {
            unitOfWork.Dispose();
        }
    }
}
