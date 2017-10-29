using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace StudyONU.Admin.Models.Task
{
    public class TaskEditBindingModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime? DateAvailable { get; set; }

        public DateTime? DateOverdue { get; set; }
    }
}
