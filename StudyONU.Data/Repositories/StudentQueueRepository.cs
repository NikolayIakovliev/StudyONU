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
    public class StudentQueueRepository : RepositoryBase<StudentQueueEntity>, IStudentQueueRepository
    {
        public StudentQueueRepository(StudyONUDbContext context)
            : base(context) { }

        public Task<StudentQueueEntity> GetByEmailAsync(string email)
        {
            return context.StudentQueue.FirstOrDefaultAsync(student => student.Email == email);
        }

        public async Task<IEnumerable<StudentQueueEntity>> GetAllOrderedAsync<TKey>(Expression<Func<StudentQueueEntity, bool>> expression, Expression<Func<StudentQueueEntity, TKey>> keySelector)
        {
            return await context.StudentQueue
                .Include(course => course.Speciality)
                .Where(expression)
                .OrderBy(keySelector)
                .ToListAsync();
        }
    }
}
