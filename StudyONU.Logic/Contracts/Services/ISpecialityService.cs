using StudyONU.Logic.DTO.Speciality;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Logic.Contracts.Services
{
    public interface ISpecialityService : IDisposable
    {
        Task<ServiceMessage> CreateAsync(string name);

        Task<ServiceMessage> EditAsync(SpecialityDTO specialityDTO);

        Task<ServiceMessage> DeleteAsync(int id);

        Task<DataServiceMessage<IEnumerable<SpecialityDTO>>> GetAllAsync();
    }
}
