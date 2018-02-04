using Microsoft.AspNetCore.Http;

namespace StudyONU.Web.Models.StudentQueue
{
    public class StudentQueueCreateBindingModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Patronymic { get; set; }

        public string Email { get; set; }

        public IFormFile Photo { get; set; }

        public int CourseNumber { get; set; }

        public int SpecialityId { get; set; }

        public int CourseId { get; set; }
    }
}
