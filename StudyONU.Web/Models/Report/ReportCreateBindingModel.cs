using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace StudyONU.Web.Models.Report
{
    public class ReportCreateBindingModel
    {
        public IEnumerable<IFormFile> Files { get; set; }

        public int TaskId { get; set; }
    }
}
