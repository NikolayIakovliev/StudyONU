using Microsoft.EntityFrameworkCore;
using StudyONU.Core;
using StudyONU.Core.Entities;
using StudyONU.Core.Infrastructure;
using StudyONU.Data.Contracts.Repositories;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<IEnumerable<ReportEntity>> GetAllByStateAndLecturerAsync(TaskState state, string email)
        {
            return await context.Reports
                .Include(report => report.Task)
                .ThenInclude(task => task.Course)
                .Include(report => report.Student)
                .ThenInclude(student => student.User)
                .Where(report => report.State == state && report.Task.Course.Lecturer.User.Email == email)
                .ToListAsync();
        }
    }
}
