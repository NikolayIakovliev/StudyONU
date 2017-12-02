using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using StudyONU.Data.Contracts;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.CourseReport;
using StudyONU.Logic.Infrastructure;
using StudyONU.Core.Entities;
using System.Linq;

namespace StudyONU.Logic.Services
{
    public class CourseReportService : ServiceBase, ICourseReportService
    {
        public CourseReportService(
            IUnitOfWork unitOfWork, 
            IMapper mapper, 
            ILogger logger
            ) : base(unitOfWork, mapper, logger) { }

        public async Task<DataServiceMessage<CourseReportDTO>> GetCourseReportAsync(int courseId)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();
            CourseReportDTO data = null;

            try
            {
                bool exists = await unitOfWork.Courses.ExistsAsync(courseId);
                if (exists)
                {
                    IEnumerable<TaskEntity> taskEntities = await unitOfWork.Tasks.GetByCourseAsync(courseId);
                    IEnumerable<StudentEntity> studentEntities = await unitOfWork.Students.GetByCourseAsnyc(courseId);

                    IEnumerable<int> studentIds = studentEntities.Select(student => student.Id);
                    IEnumerable<ReportEntity> reportEntities = await unitOfWork.Reports.GetAllAsync(report => studentIds.Contains(report.StudentId));

                    data = new CourseReportDTO
                    {
                        Tasks = mapper.Map<IEnumerable<CourseTaskItem>>(taskEntities)
                    };

                    data.Students = studentEntities.Select(studentEntity => 
                    {
                        IEnumerable<ReportEntity> reports = reportEntities.Where(report => report.StudentId == studentEntity.Id);

                        UserEntity userEntity = studentEntity.User;
                        return new StudentReport
                        {
                            StudentFullName = $"{userEntity.LastName} {userEntity.FirstName} {userEntity.Patronymic}",
                            Reports = mapper.Map<IEnumerable<CourseReportItem>>(reports)
                        };
                    });
                }
                else
                {
                    errors.AddCommonError("Course was not found");
                    actionResult = ServiceActionResult.NotFound;
                }
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
                actionResult = ServiceActionResult.Exception;
                errors.AddExceptionError();
            }

            return new DataServiceMessage<CourseReportDTO>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }
    }
}
