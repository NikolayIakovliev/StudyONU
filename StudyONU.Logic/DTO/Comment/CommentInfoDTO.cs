using System;

namespace StudyONU.Logic.DTO.Comment
{
    public class CommentInfoDTO
    {
        public string StudentEmail { get; set; }

        public string LecturerEmail { get; set; }

        public DateTime DateCreated { get; set; }

        public int TaskId { get; set; }

        public string TaskName { get; set; }

        public int CourseId { get; set; }

        public string CourseName { get; set; }
    }
}
