using AutoMapper;
using Newtonsoft.Json;
using StudyONU.Core.Entities;
using StudyONU.Core.Infrastructure;
using StudyONU.Data.Contracts;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Task;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Logic.Services
{
    public class TaskService : ServiceBase, ITaskService
    {
        public TaskService(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ILogger logger)
            : base(unitOfWork, mapper, logger) { }

        public async Task<ServiceMessage> CreateAsync(TaskCreateDTO taskCreateDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            try
            {
                CourseEntity courseEntity = await unitOfWork.Courses.GetAsync(taskCreateDTO.CourseId);
                if (courseEntity != null)
                {
                    TaskEntity taskEntity = mapper.Map<TaskEntity>(taskCreateDTO);
                    taskEntity.Course = courseEntity;

                    await unitOfWork.Tasks.AddAsync(taskEntity);
                    await unitOfWork.CommitAsync();
                }
                else
                {
                    actionResult = ServiceActionResult.NotFound;
                    errors.AddCommonError("Course was not found");
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

        public async Task<ServiceMessage> EditAsync(TaskEditDTO taskEditDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            try
            {
                TaskEntity taskEntity = await unitOfWork.Tasks.GetAsync(taskEditDTO.Id);
                if (taskEntity != null)
                {
                    taskEntity.Title = taskEditDTO.Title;
                    taskEntity.Description = taskEditDTO.Description;
                    taskEntity.DateAvailable = taskEditDTO.DateAvailable;
                    taskEntity.DateOverdue = taskEditDTO.DateOverdue;

                    await unitOfWork.CommitAsync();
                }
                else
                {
                    errors.AddCommonError("Task was not found");
                    actionResult = ServiceActionResult.NotFound;
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

        public async Task<ServiceMessage> EditFilesAsync(int id, IEnumerable<string> filePaths)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            try
            {
                TaskEntity taskEntity = await unitOfWork.Tasks.GetAsync(id);
                if (taskEntity != null)
                {
                    taskEntity.FilePaths = JsonConvert.SerializeObject(filePaths);

                    await unitOfWork.CommitAsync();
                }
                else
                {
                    errors.AddCommonError("Task was not found");
                    actionResult = ServiceActionResult.NotFound;
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

        public async Task<ServiceMessage> DeleteAsync(int id)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            try
            {
                TaskEntity taskEntity = await unitOfWork.Tasks.GetAsync(id);
                if (taskEntity != null)
                {
                    unitOfWork.Tasks.Remove(taskEntity);
                    await unitOfWork.CommitAsync();
                }
                else
                {
                    errors.AddCommonError("Task was not found");
                    actionResult = ServiceActionResult.NotFound;
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

        public async Task<DataServiceMessage<IEnumerable<TaskListDTO>>> GetByLecturerEmailAsync(string email)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();
            IEnumerable<TaskListDTO> data = null;

            try
            {
                LecturerEntity lecturerEntity = await unitOfWork.Lecturers.GetByEmailAsync(email);
                if (lecturerEntity != null)
                {
                    IEnumerable<TaskEntity> taskEntities = await unitOfWork.Tasks.GetAllByLecturerIdOrderedAsync(lecturerEntity.Id, task => task.Title);
                    data = mapper.Map<IEnumerable<TaskListDTO>>(taskEntities);
                }
                else
                {
                    actionResult = ServiceActionResult.NotFound;
                    errors.AddCommonError("Lecturer was not found");
                }
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
                actionResult = ServiceActionResult.Exception;
                errors.AddExceptionError();
            }

            return new DataServiceMessage<IEnumerable<TaskListDTO>>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }

        public async Task<DataServiceMessage<IEnumerable<StudentTaskListDTO>>> GetByCourseAndStudentAsync(int courseId, string studentEmail)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();
            IEnumerable<StudentTaskListDTO> data = null;

            try
            {
                CourseEntity courseEntity = await unitOfWork.Courses.GetAsync(courseId);
                if (courseEntity != null)
                {
                    StudentEntity studentEntity = await unitOfWork.Students.GetByEmailAsync(studentEmail);

                    bool hasAccess =
                        courseEntity.IsPublished ||
                        (studentEntity != null &&
                        courseEntity.SpecialityId == studentEntity.SpecialityId &&
                        courseEntity.CourseNumber == studentEntity.CourseNumber);

                    if (hasAccess)
                    {
                        IEnumerable<TaskEntity> taskEntities = await unitOfWork.Tasks.GetAllAsync(task =>
                                task.CourseId == courseId &&
                                (
                                    task.Course.IsPublished ||
                                    !task.DateAvailable.HasValue ||
                                    task.DateAvailable.Value >= DateTime.Now.Date
                                )
                            );
                        data = mapper.Map<IEnumerable<StudentTaskListDTO>>(taskEntities);
                        if (studentEntity != null)
                        {
                            foreach (StudentTaskListDTO task in data)
                            {
                                TaskState taskState = await unitOfWork.Reports.GetReportState(studentEntity.Id, task.Id);
                                task.ReportStatus = (int)taskState;
                            }
                        }
                    }
                    else
                    {
                        actionResult = ServiceActionResult.Error;
                        errors.AddAccessError("Student doesn't have an access to course");
                    }
                }
                else
                {
                    actionResult = ServiceActionResult.NotFound;
                    errors.AddCommonError("Course was not found");
                }
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
                actionResult = ServiceActionResult.Exception;
                errors.AddExceptionError();
            }

            return new DataServiceMessage<IEnumerable<StudentTaskListDTO>>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }
    }
}
