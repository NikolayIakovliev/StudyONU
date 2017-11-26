namespace StudyONU.Logic.DTO.Comment
{
    public class CommentCreateDTO
    {
        public string Text { get; set; }

        public string SenderEmail { get; set; }

        public string StudentEmail { get; set; }

        public int TaskId { get; set; }
    }
}
