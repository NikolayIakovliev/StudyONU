using Microsoft.EntityFrameworkCore;
using StudyONU.Core;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts.Repositories;
using System.Threading.Tasks;

namespace StudyONU.Data.Repositories
{
    public class AdminRepository : RepositoryBase<AdminEntity>, IAdminRepository
    {
        public AdminRepository(StudyONUDbContext context)
            : base(context) { }

        public Task<AdminEntity> GetByEmailAsync(string email)
        {
            return context.Admins
                .Include(admin => admin.User)
                .ThenInclude(user => user.Role)
                .FirstOrDefaultAsync(admin => admin.User.Email == email);
        }
    }
}
