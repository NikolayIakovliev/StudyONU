using System.Collections.Generic;

namespace StudyONU.Core.Entities
{
    public class RoleEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string DisplayName { get; set; }

        public virtual ICollection<UserEntity> Users { get; set; }
    }
}
