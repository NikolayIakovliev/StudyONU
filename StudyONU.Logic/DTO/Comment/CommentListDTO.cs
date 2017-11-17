using System;

namespace StudyONU.Logic.DTO.Comment
{
    public class CommentListDTO
    {
        public string Text { get; set; }

        public string SenderEmail { get; set; }

        public string SenderFullName { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
