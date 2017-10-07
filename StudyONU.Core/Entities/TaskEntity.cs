using System;
using System.Collections.Generic;

namespace StudyONU.Core.Entities
{
    public class TaskEntity
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string FilePaths { get; set; }

        public DateTime? DateAvailable { get; set; }

        public DateTime? DateOverdue { get; set; }

        public int CourseId { get; set; }

        public virtual CourseEntity Course { get; set; }

        public virtual ICollection<CommentEntity> Comments { get; set; }

        public virtual ICollection<ReportEntity> Reports { get; set; }
    }
}
