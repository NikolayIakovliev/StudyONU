using StudyONU.Core.Entities;
using System.Threading.Tasks;

namespace StudyONU.Data.Contracts.Repositories
{
    public interface ILecturerRepository : IRepository<LecturerEntity>
    {
        Task<LecturerEntity> GetByEmailAsync(string email);

        Task<LecturerEntity> GetByTaskAsync(int taskId);
    }
}
