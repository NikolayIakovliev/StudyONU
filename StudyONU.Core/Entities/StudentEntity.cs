using StudyONU.Core.Identity;
using System.Collections.Generic;

namespace StudyONU.Core.Entities
{
    public class StudentEntity
    {
        public int Id { get; set; }

        public int CourseNumber { get; set; }

        public int ApplicationUserId { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }

        public virtual ICollection<ReportEntity> Reports { get; set; }
    }
}
