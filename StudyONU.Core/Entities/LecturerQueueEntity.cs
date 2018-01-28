using System;

namespace StudyONU.Core.Entities
{
    public class LecturerQueueEntity
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Patronymic { get; set; }

        public string PhotoPath { get; set; }

        public string Email { get; set; }

        public bool? Approved { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime? DateApproved { get; set; }
    }
}
