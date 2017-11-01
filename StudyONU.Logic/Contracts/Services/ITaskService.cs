using StudyONU.Logic.DTO.Task;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Logic.Contracts.Services
{
    public interface ITaskService : IDisposable
    {
        Task<ServiceMessage> CreateAsync(TaskCreateDTO taskCreateDTO);

        Task<ServiceMessage> EditAsync(TaskEditDTO taskEditDTO);

        Task<ServiceMessage> EditFilesAsync(int id, IEnumerable<string> filePaths);

        Task<ServiceMessage> DeleteAsync(int id);

        Task<DataServiceMessage<IEnumerable<TaskListDTO>>> GetByLecturerEmailAsync(string email);

        Task<DataServiceMessage<IEnumerable<TaskListDTO>>> GetByCourseAndStudentAsync(int courseId, string studentEmail);
    }
}
