using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace StudyONU.Admin.Models.Task
{
    public class TaskCreateBindingModel
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public IEnumerable<IFormFile> Files { get; set; }

        public DateTime? DateAvailable { get; set; }

        public DateTime? DateOverdue { get; set; }

        public int CourseId { get; set; }
    }
}
