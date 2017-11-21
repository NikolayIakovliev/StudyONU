﻿using StudyONU.Logic.DTO.Report;
using StudyONU.Logic.Infrastructure;
using System;
using System.Threading.Tasks;

namespace StudyONU.Logic.Contracts.Services
{
    public interface IReportService : IDisposable
    {
        Task<ServiceMessage> CreateAsync(ReportCreateDTO reportDTO, string studentEmail);

        Task<ServiceMessage> DeleteAsync(int taskId, string studentEmail);
    }
}
