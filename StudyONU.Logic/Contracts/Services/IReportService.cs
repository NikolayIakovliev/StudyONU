using StudyONU.Logic.DTO.Report;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Logic.Contracts.Services
{
    public interface IReportService : IDisposable
    {
        Task<ServiceMessage> CreateAsync(ReportCreateDTO reportDTO, string studentEmail);

        Task<ServiceMessage> ChangeOnCheckStateAsync(int taskId, string studentEmail);

        Task<ServiceMessage> CancelAsync(int taskId, string studentEmail);

        Task<DataServiceMessage<IEnumerable<ReportListDTO>>> GetSentAsync(string lecturerEmail);
    }
}
