using StudyONU.Logic.DTO.CourseReport;
using StudyONU.Logic.Infrastructure;
using System;
using System.Threading.Tasks;

namespace StudyONU.Logic.Contracts.Services
{
    public interface ICourseReportService : IDisposable
    {
        Task<DataServiceMessage<CourseReportDTO>> GetCourseReportAsync(int courseId);
    }
}
