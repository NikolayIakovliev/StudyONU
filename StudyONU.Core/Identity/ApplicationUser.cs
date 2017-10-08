using Microsoft.AspNetCore.Identity;
using StudyONU.Core.Entities;
using System.Collections.Generic;

namespace StudyONU.Core.Identity
{
    public class ApplicationUser : IdentityUser<int>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Patronymic { get; set; }

        public string PhotoPath { get; set; }

        public virtual ICollection<LecturerEntity> Lecturers { get; set; }

        public virtual ICollection<StudentEntity> Students { get; set; }

        public virtual ICollection<CommentEntity> Comments { get; set; }

        public virtual IEnumerable<AdminEntity> Admins { get; set; }
    }
}
