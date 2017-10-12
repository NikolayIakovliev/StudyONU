using System.Collections.Generic;

namespace StudyONU.Core.Entities
{
    public class UserEntity
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Patronymic { get; set; }

        public string Email { get; set; }

        public string PhotoPath { get; set; }

        public string PasswordHash { get; set; }

        public int RoleId { get; set; }

        public virtual RoleEntity Role { get; set; }

        public virtual ICollection<LecturerEntity> Lecturers { get; set; }

        public virtual ICollection<StudentEntity> Students { get; set; }

        public virtual ICollection<CommentEntity> Comments { get; set; }

        public virtual IEnumerable<AdminEntity> Admins { get; set; }
    }
}
