﻿using StudyONU.Core.Entities;
using StudyONU.Core.Infrastructure;
using System.Threading.Tasks;

namespace StudyONU.Data.Contracts.Repositories
{
    public interface IReportRepository : IRepository<ReportEntity>
    {
        Task<TaskState> GetReportState(int studentId, int taskId);
    }
}
