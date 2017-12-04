using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Infrastructure;
using StudyONU.Logic.Options;
using System;
using System.Threading.Tasks;

namespace StudyONU.Logic.Helpers
{
    public class EmailSender : IEmailSender
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly EmailOptions options;
        private readonly ILogger logger;

        public EmailSender(
            IUnitOfWork unitOfWork,
            IOptions<EmailOptions> options,
            ILogger logger
            )
        {
            this.unitOfWork = unitOfWork;
            this.options = options.Value;
            this.logger = logger;
        }

        public async Task<ServiceMessage> SendEmailAsync(string to, string subject, string body)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            try
            {
                string toAdressTitle = to;

                UserEntity userEntity = await unitOfWork.Users.GetByEmailAsync(to);
                if (userEntity != null)
                {
                    toAdressTitle = $"{userEntity.LastName} {userEntity.FirstName} {userEntity.Patronymic}";
                }

                MimeMessage mimeMessage = new MimeMessage();
                mimeMessage.From.Add(new MailboxAddress(options.FromAddress, options.Email));
                mimeMessage.To.Add(new MailboxAddress(toAdressTitle, to));
                mimeMessage.Subject = subject;
                mimeMessage.Body = new TextPart("plain")
                {
                    Text = body
                };

                using (SmtpClient client = new SmtpClient())
                {
                    await client.ConnectAsync(options.Server, options.Port, false);

                    client.AuthenticationMechanisms.Remove("XOAUTH2");

                    await client.AuthenticateAsync(options.Email, options.Password);

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
    }
}
