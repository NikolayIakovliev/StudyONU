using StudyONU.Logic.Infrastructure;
using System;
using System.Threading.Tasks;

namespace StudyONU.Logic.Contracts
{
    public interface IEmailSender
    {
        Task<ServiceMessage> SendEmailAsync(string to, string subject, string body);
    }
}
