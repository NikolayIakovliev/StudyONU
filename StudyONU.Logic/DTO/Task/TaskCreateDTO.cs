﻿using System;
using System.Collections.Generic;

namespace StudyONU.Logic.DTO.Task
{
    public class TaskCreateDTO
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public IEnumerable<string> FilePaths { get; set; }

        public DateTime? DateAvailable { get; set; }

        public DateTime? DateOverdue { get; set; }

        public int CourseId { get; set; }
    }
}
