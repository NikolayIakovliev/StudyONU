using Microsoft.AspNetCore.Http;

namespace StudyONU.Web.Models.Report
{
    public class ReportCreateBindingModel
    {
        public IFormFile File { get; set; }

        public int TaskId { get; set; }
    }
}
