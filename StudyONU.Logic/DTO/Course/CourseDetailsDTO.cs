namespace StudyONU.Logic.DTO.Course
{
    public class CourseDetailsDTO
    {
        public string Name { get; set; }

        public byte CourseNumber { get; set; }

        public string SpecialityName { get; set; }

        public string LecturerFullName { get; set; }

        public string LecturerPhotoPath { get; set; }

        public bool ReadOnly { get; set; }
    }
}
