using StudyONU.Logic.DTO.LecturerQueue;
using StudyONU.Logic.Infrastructure;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Logic.Contracts.Services
{
    public interface ILecturerQueueService : IService
    {
        Task<ServiceMessage> CreateAsync(LecturerQueueCreateDTO lecturerDTO);

        Task<DataServiceMessage<LecturerRegisteredDTO>> ApproveAsync(int id);

        Task<DataServiceMessage<LecturerRegisteredDTO>> DisapproveAsync(int id);

        Task<DataServiceMessage<IEnumerable<LecturerQueueListDTO>>> GetAwaitingAsync();
    }
}
