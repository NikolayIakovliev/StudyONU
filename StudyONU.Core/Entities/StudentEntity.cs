using System.Collections.Generic;

namespace StudyONU.Core.Entities
{
    public class StudentEntity
    {
        public int Id { get; set; }

        public int CourseNumber { get; set; }

        public int UserId { get; set; }

        public virtual UserEntity User { get; set; }

        public virtual ICollection<ReportEntity> Reports { get; set; }
    }
}
