using System.Collections.Generic;

namespace StudyONU.Logic.Infrastructure
{
    public class ServiceMessage
    {
        public ServiceActionResult ActionResult { get; set; }

        public List<string> Errors { get; set; }
    }
}
