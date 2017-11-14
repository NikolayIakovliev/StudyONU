using StudyONU.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace StudyONU.Data.Contracts.Repositories
{
    public interface ICourseRepository : IRepository<CourseEntity>
    {
        Task<CourseEntity> GetDetailedAsync(int id);

        Task<IEnumerable<CourseEntity>> GetAllByLecturerEmailAsync<TKey>(string email, Expression<Func<CourseEntity, TKey>> keySelector);

        Task<IEnumerable<CourseEntity>> GetAllByStudentEmailAsync<TKey>(string email, Expression<Func<CourseEntity, TKey>> keySelector);

        Task<IEnumerable<CourseEntity>> GetAllOrderedAsync<TKey>(Expression<Func<CourseEntity, bool>> expression, Expression<Func<CourseEntity, TKey>> keySelector);
    }
}
