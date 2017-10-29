using System.Collections.Generic;

namespace StudyONU.Core.Entities
{
    public class SpecialityEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<CourseEntity> Courses { get; set; }

        public virtual ICollection<StudentEntity> Students { get; set; }
    }
}
