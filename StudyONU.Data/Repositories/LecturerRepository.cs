using Microsoft.EntityFrameworkCore;
using StudyONU.Core;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace StudyONU.Data.Repositories
{
    public class LecturerRepository : RepositoryBase<LecturerEntity>, ILecturerRepository
    {
        public LecturerRepository(StudyONUDbContext context)
            : base(context) { }

        public override Task<LecturerEntity> GetAsync(int id)
        {
            return context.Lecturers
                .Include(lecturer => lecturer.User)
                .FirstOrDefaultAsync(lecturer => lecturer.Id == id);
        }

        public override async Task<IEnumerable<LecturerEntity>> GetAllAsync(Expression<Func<LecturerEntity, bool>> expression = null)
        {
            IQueryable<LecturerEntity> entities = expression != null
                ? context.Lecturers.Include(lecturer => lecturer.User).Where(expression)
                : context.Lecturers.Include(lecturer => lecturer.User);

            return await entities.ToListAsync();
        }

        public Task<LecturerEntity> GetByEmailAsync(string email)
        {
            return context.Lecturers
                .Include(lecturer => lecturer.User)
                .ThenInclude(user => user.Role)
                .FirstOrDefaultAsync(lecturer => lecturer.User.Email == email);
        }

        public Task<LecturerEntity> GetByTaskAsync(int taskId)
        {
            return context.Lecturers
                .Include(lecturer => lecturer.User)
                .FirstOrDefaultAsync(lecturer => lecturer.Courses.Any(course => course.Tasks.Any(task => task.Id == taskId)));
        }
    }
}
