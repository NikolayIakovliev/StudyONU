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

        Task<DataServiceMessage<IEnumerable<TaskListDTO>>> GetByLecturerEmailAsync(string email);
    }
}
