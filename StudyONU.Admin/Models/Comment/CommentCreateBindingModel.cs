namespace StudyONU.Admin.Models.Comment
{
    public class CommentCreateBindingModel
    {
        public string Text { get; set; }

        public string StudentEmail { get; set; }

        public int TaskId { get; set; }
    }
}
