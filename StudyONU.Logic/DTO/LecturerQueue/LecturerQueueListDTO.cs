using System;

namespace StudyONU.Logic.DTO.LecturerQueue
{
    public class LecturerQueueListDTO
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Patronymic { get; set; }

        public string PhotoPath { get; set; }

        public string Email { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
