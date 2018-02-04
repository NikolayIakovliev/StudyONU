using StudyONU.Logic.DTO.Course;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Logic.Contracts.Services
{
    public interface ICourseService : IDisposable
    {
        Task<ServiceMessage> CreateAsync(CourseCreateDTO courseCreateDTO);

        Task<ServiceMessage> EditAsync(CourseEditDTO courseEditDTO);

        Task<ServiceMessage> DeleteAsync(int id);

        Task<DataServiceMessage<CourseDetailsDTO>> GetAsync(int id);

        Task<DataServiceMessage<CourseDetailsDTO>> GetAsync(int id, string studentEmail);

        Task<DataServiceMessage<IEnumerable<CourseShortListDTO>>> GetByAsync(int specialityId, int courseNumber);

        Task<DataServiceMessage<IEnumerable<CourseListDTO>>> GetByLecturerEmailAsync(string email);

        Task<DataServiceMessage<IEnumerable<CourseListDTO>>> GetByStudentEmailAsync(string email);

        Task<DataServiceMessage<IEnumerable<CourseListDTO>>> GetRecommendedAsync(int studentQueueId);

        Task<DataServiceMessage<IEnumerable<CourseListDTO>>> GetPublishedAsync();
    }
}
