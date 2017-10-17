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

        Task<DataServiceMessage<IEnumerable<SpecialityListDTO>>> GetAllAsync();
    }
}
