using StudyONU.Logic.DTO.Lecturer;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Logic.Contracts.Services
{
    public interface ILecturerService : IDisposable
    {
        Task<DataServiceMessage<IEnumerable<LecturerListDTO>>> GetAllAsync();
    }
}
