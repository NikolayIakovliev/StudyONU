using System.Collections.Generic;

namespace StudyONU.Core.Entities
{
    public class LecturerEntity
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public virtual UserEntity User { get; set; }

        public virtual ICollection<CourseEntity> Courses { get; set; }
    }
}
