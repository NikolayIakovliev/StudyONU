using Microsoft.AspNetCore.Http;

namespace StudyONU.Admin.Models.Lecturer
{
    public class LecturerEditBindingModel
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Patronymic { get; set; }
    }
}
