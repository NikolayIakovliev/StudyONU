namespace StudyONU.Core.Entities
{
    public class StudentCourseEntity
    {
        public int StudentId { get; set; }

        public virtual StudentEntity Student { get; set; }

        public int CourseId { get; set; }

        public virtual CourseEntity Course { get; set; }
    }
}
