using System.Threading.Tasks;
using StudyONU.Core;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts.Repositories;
using Microsoft.EntityFrameworkCore;

namespace StudyONU.Data.Repositories
{
    public class UserRepository : RepositoryBase<UserEntity>, IUserRepository
    {
        public UserRepository(StudyONUDbContext context)
            : base(context) { }

        public Task<UserEntity> GetByEmailAsync(string email)
        {
            return context.Users
                .Include(user => user.Role)
                .FirstOrDefaultAsync(user => user.Email == email);
        }
    }
}
