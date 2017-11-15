using System.Collections.Generic;

namespace StudyONU.Logic.Infrastructure
{
    public class ServiceMessage
    {
        public ServiceActionResult ActionResult { get; set; }

        public ErrorCollection Errors { get; set; }
    }
}
