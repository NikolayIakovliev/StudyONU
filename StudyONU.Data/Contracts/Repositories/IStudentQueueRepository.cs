using StudyONU.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace StudyONU.Data.Contracts.Repositories
{
    public interface IStudentQueueRepository : IRepository<StudentQueueEntity>
    {
        Task<StudentQueueEntity> GetByEmailAsync(string email);

        Task<IEnumerable<StudentQueueEntity>> GetAllOrderedAsync<TKey>(Expression<Func<StudentQueueEntity, bool>> expression, Expression<Func<StudentQueueEntity, TKey>> keySelector);
    }
}
