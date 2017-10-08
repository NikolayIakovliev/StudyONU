using StudyONU.Core.Identity;

namespace StudyONU.Core.Entities
{
    public class AdminEntity
    {
        public int Id { get; set; }

        public int ApplicationUserId { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
