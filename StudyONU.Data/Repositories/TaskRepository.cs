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
    public class TaskRepository : RepositoryBase<TaskEntity>, ITaskRepository
    {
        public TaskRepository(StudyONUDbContext context)
            : base(context) { }

        public Task<TaskEntity> GetDetailedAsync(int id)
        {
            return context.Tasks
                .Include(task => task.Comments)
                .Include(task => task.Reports)
                .FirstOrDefaultAsync(task => task.Id == id)
        }

        public async Task<IEnumerable<TaskEntity>> GetAllByLecturerIdAsync(int id)
        {
            return await context.Tasks
                .Include(task => task.Course)
                .Where(task => task.Course.LecturerId == id)
                .ToListAsync();
        }

        public async Task<IEnumerable<TaskEntity>> GetAllByLecturerIdOrderedAsync<TKey>(int id, Expression<Func<TaskEntity, TKey>> keySelector)
        {
            return await context.Tasks
                .Include(task => task.Course)
                .Where(task => task.Course.LecturerId == id)
                .OrderBy(keySelector)
                .ToListAsync();
        }
    }
}
