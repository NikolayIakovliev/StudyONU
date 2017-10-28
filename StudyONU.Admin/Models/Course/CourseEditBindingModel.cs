namespace StudyONU.Admin.Models.Course
{
    public class CourseEditBindingModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public byte CourseNumber { get; set; }

        public bool IsPublished { get; set; }

        public int SpecialityId { get; set; }
    }
}
