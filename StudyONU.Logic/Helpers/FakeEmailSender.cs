using StudyONU.Logic.Contracts;
using StudyONU.Logic.Infrastructure;
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

            return new ServiceMessage
            {
                ActionResult = actionResult,
                Errors = errors
            };
        }

        public void Dispose()
        {

        }
    }
}
