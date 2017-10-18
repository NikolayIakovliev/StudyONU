using Microsoft.AspNetCore.Http;
using System;

namespace StudyONU.Admin.Models.Guide
{
    public class GuideCreateBindingModel
    {
        public string Name { get; set; }

        public IFormFile File { get; set; }

        public DateTime? DateAvailable { get; set; }

        public int CourseId { get; set; }
    }
}
