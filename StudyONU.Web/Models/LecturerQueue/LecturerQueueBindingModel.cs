using Microsoft.AspNetCore.Http;

namespace StudyONU.Web.Models.LecturerQueue
{
    public class LecturerQueueBindingModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Patronymic { get; set; }

        public string Email { get; set; }

        public IFormFile Photo { get; set; }
    }
}
