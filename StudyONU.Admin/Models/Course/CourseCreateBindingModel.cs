﻿namespace StudyONU.Admin.Models.Course
{
    public class CourseCreateBindingModel
    {
        public string Name { get; set; }

        public byte CourseNumber { get; set; }

        public bool IsPublished { get; set; }

        public int SpecialityId { get; set; }
    }
}
