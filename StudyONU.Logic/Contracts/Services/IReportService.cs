using StudyONU.Logic.DTO.Report;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Logic.Contracts.Services
{
    public interface IReportService : IDisposable
    {
        Task<ServiceMessage> SendAsync(ReportCreateDTO reportDTO, string studentEmail);

        Task<ServiceMessage> OnCheckAsync(int taskId, string studentEmail);

        Task<ServiceMessage> CancelAsync(int taskId, string studentEmail);

        Task<ServiceMessage> AcceptAsync(int taskId, string studentEmail, decimal mark);

        Task<ServiceMessage> RejectAsync(int taskId, string studentEmail);

        Task<DataServiceMessage<IEnumerable<ReportListDTO>>> GetSentAsync(string lecturerEmail);

        Task<DataServiceMessage<IEnumerable<ReportListDTO>>> GetOnCheckAsync(string lecturerEmail);
    }
}
