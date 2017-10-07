using StudyONU.Core.Identity;
using System.Collections.Generic;

namespace StudyONU.Core.Entities
{
    public class LecturerEntity
    {
        public int Id { get; set; }

        public int ApplicationUserId { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }

        public virtual ICollection<CourseEntity> Courses { get; set; }
    }
}
