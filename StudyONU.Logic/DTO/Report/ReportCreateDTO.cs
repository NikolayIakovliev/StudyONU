using System.Collections.Generic;

namespace StudyONU.Logic.DTO.Report
{
    public class ReportCreateDTO
    {
        public int TaskId { get; set; }

        public IEnumerable<string> FilePaths { get; set; }
    }
}
