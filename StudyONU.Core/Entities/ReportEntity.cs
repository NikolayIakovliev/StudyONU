using StudyONU.Core.Infrastructure;
using System;

namespace StudyONU.Core.Entities
{
    public class ReportEntity
    {
        public int TaskId { get; set; }

        public virtual TaskEntity Task { get; set; }

        public int StudentId { get; set; }

        public virtual StudentEntity Student { get; set; }

        public string FilePaths { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

        public DateTime? DateAccepted { get; set; }

        public TaskState State { get; set; }

        public decimal? Mark { get; set; }
    }
}
