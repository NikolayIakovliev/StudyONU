using StudyONU.Logic.DTO.Comment;
using System;
using System.Collections.Generic;

namespace StudyONU.Logic.DTO.Task
{
    public class TaskDetailsDTO
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public IEnumerable<string> FilePaths { get; set; }

        public DateTime? DateOverdue { get; set; }
        
        public int ReportStatus { get; set; }

        public decimal? Mark { get; set; }

        public DateTime? DateAccepted { get; set; }
    }
}
