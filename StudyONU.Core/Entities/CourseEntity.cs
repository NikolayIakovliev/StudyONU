using System;
using System.Collections.Generic;

namespace StudyONU.Core.Entities
{
    public class CourseEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime DateCreated { get; set; }

        public int CourseNumber { get; set; }

        public bool IsPublished { get; set; }

        public int SpecialityId { get; set; }

        public virtual SpecialityEntity Speciality { get; set; }

        public int LecturerId { get; set; }

        public virtual LecturerEntity Lecturer { get; set; }

        public virtual ICollection<GuideEntity> Guides { get; set; }

        public virtual ICollection<TaskEntity> Tasks { get; set; }
    }
}
