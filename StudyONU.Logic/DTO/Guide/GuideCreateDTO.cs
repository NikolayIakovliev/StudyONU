using System;

namespace StudyONU.Logic.DTO.Guide
{
    public class GuideCreateDTO
    {
        public string Name { get; set; }

        public string FilePath { get; set; }

        public DateTime? DateAvailable { get; set; }

        public int CourseId { get; set; }
    }
}
