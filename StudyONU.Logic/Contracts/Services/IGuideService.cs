using StudyONU.Logic.DTO.Guide;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Logic.Contracts.Services
{
    public interface IGuideService : IDisposable
    {
        Task<ServiceMessage> CreateAsync(GuideCreateDTO guideCreateDTO);

        Task<DataServiceMessage<IEnumerable<GuideListDTO>>> GetByLecturerEmailAsync(string email);
    }
}
