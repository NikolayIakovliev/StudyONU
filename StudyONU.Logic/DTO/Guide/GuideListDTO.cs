using System;

namespace StudyONU.Logic.DTO.Guide
{
    public class GuideListDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string FilePath { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime? DateAvailable { get; set; }

        public string CourseName { get; set; }

        public byte CourseNumber { get; set; }

        public bool IsPublished { get; set; }
    }
}
