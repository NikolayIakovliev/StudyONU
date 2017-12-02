using System.Collections.Generic;

namespace StudyONU.Logic.DTO.CourseReport
{
    public class CourseReportDTO
    {
        public IEnumerable<CourseTaskItem> Tasks { get; set; }

        public IEnumerable<StudentReport> Students { get; set; }
    }
}
