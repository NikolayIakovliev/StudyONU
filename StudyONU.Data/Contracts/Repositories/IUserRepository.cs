using StudyONU.Core.Entities;
using System.Threading.Tasks;

namespace StudyONU.Data.Contracts.Repositories
{
    public interface IUserRepository : IRepository<UserEntity>
    {
        Task<UserEntity> GetByEmailAsync(string email);
    }
}
