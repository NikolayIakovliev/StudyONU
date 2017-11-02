namespace StudyONU.Logic.DTO.StudentQueue
{
    public class StudentQueueListDTO
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Patronymic { get; set; }

        public string PhotoPath { get; set; }

        public string Email { get; set; }

        public int CourseNumber { get; set; }

        public string SpecialityName { get; set; }

        public bool? Approved { get; set; }
    }
}
