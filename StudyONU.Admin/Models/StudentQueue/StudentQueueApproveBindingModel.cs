using System.Collections.Generic;

namespace StudyONU.Admin.Models.StudentQueue
{
    public class StudentQueueApproveBindingModel
    {
        public int Id { get; set; }

        public IEnumerable<int> CourseIds { get; set; }
    }
}
