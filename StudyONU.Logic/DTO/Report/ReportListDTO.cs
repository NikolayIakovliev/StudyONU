using System.Collections.Generic;

namespace StudyONU.Logic.DTO.Report
{
    public class ReportListDTO
    {
        public int TaskId { get; set; }

        public IEnumerable<string> FilePaths { get; set; }

        public int CourseId { get; set; }

        public string TaskTitle { get; set; }

        public string CourseName { get; set; }

        public string CourseNumber { get; set; }

        public int StudentId { get; set; }

        public string StudentPhoto { get; set; }

        public string StudentFullName { get; set; }

        public string StudentEmail { get; set; }
    }
}
