using System.Collections.Generic;

namespace StudyONU.Logic.DTO.CourseReport
{
    public class StudentReport
    {
        public string StudentFullName { get; set; }

        public IEnumerable<CourseReportItem> Reports { get; set; }
    }
}
