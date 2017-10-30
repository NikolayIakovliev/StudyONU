namespace StudyONU.Logic.DTO.Course
{
    public class CourseEditDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public byte CourseNumber { get; set; }

        public bool IsPublished { get; set; }

        public int SpecialityId { get; set; }
    }
}
