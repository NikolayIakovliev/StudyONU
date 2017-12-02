using StudyONU.Core.Entities;
using StudyONU.Logic.DTO.CourseReport;

namespace StudyONU.Logic.Mappings
{
    class CourseReportProfile : ProfileBase
    {
        public CourseReportProfile()
        {
            CreateMap<TaskEntity, CourseTaskItem>();
            CreateMap<ReportEntity, CourseReportItem>();
        }
    }
}
