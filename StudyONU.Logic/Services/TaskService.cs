 using AutoMapper;
using Newtonsoft.Json;
using StudyONU.Core.Entities;
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
            IExceptionMessageBuilder exceptionMessageBuilder)
            : base(unitOfWork, mapper, exceptionMessageBuilder) { }

        public async Task<ServiceMessage> CreateAsync(TaskCreateDTO taskCreateDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();

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
                    errors.Add("Course was not found");
                }
            }
            catch (Exception exception)
            {
                exceptionMessageBuilder.FillErrors(exception, errors);
                actionResult = ServiceActionResult.Exception;
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
            List<string> errors = new List<string>();

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
                    errors.Add("Task was not found");
                    actionResult = ServiceActionResult.NotFound;
                }
            }
            catch (Exception exception)
            {
                exceptionMessageBuilder.FillErrors(exception, errors);
                actionResult = ServiceActionResult.Exception;
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
            List<string> errors = new List<string>();

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
                    errors.Add("Task was not found");
                    actionResult = ServiceActionResult.NotFound;
                }
            }
            catch (Exception exception)
            {
                exceptionMessageBuilder.FillErrors(exception, errors);
                actionResult = ServiceActionResult.Exception;
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
            List<string> errors = new List<string>();

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
                    errors.Add("Task was not found");
                    actionResult = ServiceActionResult.NotFound;
                }
            }
            catch (Exception exception)
            {
                exceptionMessageBuilder.FillErrors(exception, errors);
                actionResult = ServiceActionResult.Exception;
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
            List<string> errors = new List<string>();
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
                    errors.Add("Lecturer was not found");
                }
            }
            catch (Exception exception)
            {
                exceptionMessageBuilder.FillErrors(exception, errors);
                actionResult = ServiceActionResult.Exception;
            }

            return new DataServiceMessage<IEnumerable<TaskListDTO>>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }
    }
}
