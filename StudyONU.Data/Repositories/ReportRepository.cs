using Microsoft.EntityFrameworkCore;
using StudyONU.Core;
using StudyONU.Core.Entities;
using StudyONU.Core.Infrastructure;
using StudyONU.Data.Contracts.Repositories;
using System.Threading.Tasks;

namespace StudyONU.Data.Repositories
{
    public class ReportRepository : RepositoryBase<ReportEntity>, IReportRepository
    {
        public ReportRepository(StudyONUDbContext context)
            : base(context) { }

        public async Task<TaskState> GetReportState(int studentId, int taskId)
        {
            TaskState status = TaskState.NotDone;

            ReportEntity reportEntity = await context.Reports.FirstOrDefaultAsync(report =>
                report.TaskId == taskId &&
                report.StudentId == studentId
                );

            if (reportEntity != null)
            {
                status = reportEntity.State;
            }

            return status;
        }
    }
}
