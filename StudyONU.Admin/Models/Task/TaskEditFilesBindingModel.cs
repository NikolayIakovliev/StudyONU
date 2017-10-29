using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace StudyONU.Admin.Models.Task
{
    public class TaskEditFilesBindingModel
    {
        public int Id { get; set; }

        public IEnumerable<IFormFile> Files { get; set; }
    }
}
