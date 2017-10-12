namespace StudyONU.Core.Entities
{
    public class AdminEntity
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public virtual UserEntity User { get; set; }
    }
}
