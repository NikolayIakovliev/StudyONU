using System;

namespace StudyONU.Logic.DTO.Guide
{
    public class GuideEditDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string FilePath { get; set; }

        public DateTime? DateAvailable { get; set; }
    }
}
