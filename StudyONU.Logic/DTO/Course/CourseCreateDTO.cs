namespace StudyONU.Logic.DTO.Course
{
    public class CourseCreateDTO
    {
        public string Name { get; set; }

        public int CourseNumber { get; set; }

        public bool IsPublished { get; set; }

        public int SpecialityId { get; set; }

        public string LecturerEmail { get; set; }
    }
}
