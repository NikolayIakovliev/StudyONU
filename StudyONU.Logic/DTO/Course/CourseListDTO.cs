namespace StudyONU.Logic.DTO.Course
{
    public class CourseListDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public byte CourseNumber { get; set; }

        public bool IsPublished { get; set; }

        public int SpecialityId { get; set; }

        public string SpecialityName { get; set; }
    }
}
