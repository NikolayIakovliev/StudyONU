using StudyONU.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace StudyONU.Data.Contracts.Repositories
{
    public interface ICourseRepository : IRepository<CourseEntity>
    {
        Task<IEnumerable<CourseEntity>> GetAllByLecturerIdAsync(int id);

        Task<IEnumerable<CourseEntity>> GetAllByLecturerIdOrderedAsync<TKey>(int id, Expression<Func<CourseEntity, TKey>> keySelector);
    }
}
