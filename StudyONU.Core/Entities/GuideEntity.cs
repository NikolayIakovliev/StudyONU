using System;

namespace StudyONU.Core.Entities
{
    public class GuideEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string FilePath { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime? DateAvailable { get; set; }

        public int CourseId { get; set; }

        public virtual CourseEntity Course { get; set; }
    }
}
