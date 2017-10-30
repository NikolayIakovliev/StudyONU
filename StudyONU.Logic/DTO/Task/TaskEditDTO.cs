using System;

namespace StudyONU.Logic.DTO.Task
{
    public class TaskEditDTO
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime? DateAvailable { get; set; }

        public DateTime? DateOverdue { get; set; }
    }
}
