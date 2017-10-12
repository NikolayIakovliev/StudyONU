using StudyONU.Core.Entities;
using System.Threading.Tasks;

namespace StudyONU.Data.Contracts.Repositories
{
    public interface IAdminRepository : IRepository<AdminEntity>
    {
        Task<AdminEntity> GetByEmailAsync(string email);
    }
}
