using AutoMapper;
using StudyONU.Core.Entities;
using StudyONU.Core.Infrastructure;
using StudyONU.Data.Contracts;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Report;
using StudyONU.Logic.Infrastructure;
using System;
using System.Threading.Tasks;

namespace StudyONU.Logic.Services
{
    public class ReportService : ServiceBase, IReportService
    {
        public ReportService(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ILogger logger
            )
            : base(unitOfWork, mapper, logger) { }

        public async Task<ServiceMessage> CreateAsync(ReportCreateDTO reportDTO, string studentEmail)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            try
            {
                StudentEntity studentEntity = await unitOfWork.Students.GetByEmailAsync(studentEmail);
                if (studentEntity != null)
                {
                    TaskEntity taskEntity = await unitOfWork.Tasks.GetAsync(reportDTO.TaskId);
                    if (taskEntity != null)
                    {
                        ReportEntity reportEntity = await unitOfWork.Reports.GetAsync(report =>
                            report.TaskId == taskEntity.Id &&
                            report.StudentId == studentEntity.Id
                        );
                        if (reportEntity == null)
                        {
                            reportEntity = mapper.Map<ReportEntity>(reportDTO);
                            reportEntity.Student = studentEntity;
                            reportEntity.State = TaskState.Sent;

                            await unitOfWork.Reports.AddAsync(reportEntity);
                            await unitOfWork.CommitAsync();
                        }
                        else
                        {
                            errors.AddCommonError("Report already exists");
                            actionResult = ServiceActionResult.Error;
                        }
                    }
                    else
                    {
                        errors.AddCommonError("Task was not found");
                        actionResult = ServiceActionResult.NotFound;
                    }
                }
                else
                {
                    actionResult = ServiceActionResult.Error;
                    errors.AddAccessError("Student doesn't have an access to course");
                }
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
                actionResult = ServiceActionResult.Exception;
                errors.AddExceptionError();
            }

            return new ServiceMessage
            {
                ActionResult = actionResult,
                Errors = errors
            };
        }

        public async Task<ServiceMessage> DeleteAsync(int taskId, string studentEmail)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            try
            {
                StudentEntity studentEntity = await unitOfWork.Students.GetByEmailAsync(studentEmail);
                if (studentEntity != null)
                {
                    ReportEntity reportEntity = await unitOfWork.Reports.GetAsync(report =>
                        report.TaskId == taskId &&
                        report.StudentId == studentEntity.Id
                    );
                    if (reportEntity != null)
                    {
                        unitOfWork.Reports.Remove(reportEntity);
                        await unitOfWork.CommitAsync();
                    }
                    else
                    {
                        errors.AddCommonError("Report was not found");
                        actionResult = ServiceActionResult.NotFound;
                    }
                }
                else
                {
                    actionResult = ServiceActionResult.Error;
                    errors.AddAccessError("Student doesn't have an access to course");
                }
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
                actionResult = ServiceActionResult.Exception;
                errors.AddExceptionError();
            }

            return new ServiceMessage
            {
                ActionResult = actionResult,
                Errors = errors
            };
        }
    }
}
