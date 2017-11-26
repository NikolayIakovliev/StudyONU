using StudyONU.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Data.Contracts.Repositories
{
    public interface IGuideRepository : IRepository<GuideEntity>
    {
        Task<IEnumerable<GuideEntity>> GetByLecturerIdAsync(int id);

        Task<IEnumerable<GuideEntity>> GetAvailableByCourseAsync(int courseId);
    }
}
