using StudyONU.Logic.DTO.StudentQueue;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Logic.Contracts.Services
{
    public interface IStudentQueueService : IDisposable
    {
        Task<ServiceMessage> CreateAsync(StudentQueueCreateDTO studentQueueCreateDTO);

        Task<DataServiceMessage<StudentRegisteredDTO>> ApproveAsync(int id, IEnumerable<int> courseIds = null);

        Task<DataServiceMessage<StudentRegisteredDTO>> DisapproveAsync(int id);

        Task<DataServiceMessage<IEnumerable<StudentQueueListDTO>>> GetUnapprovedAsync();

        Task<DataServiceMessage<IEnumerable<StudentQueueListDTO>>> GetAllAsync();
    }
}
