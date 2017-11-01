using Microsoft.AspNetCore.Http;
using System;

namespace StudyONU.Admin.Models.Guide
{
    public class GuideEditBindingModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public IFormFile File { get; set; }

        public DateTime? DateAvailable { get; set; }
    }
}
