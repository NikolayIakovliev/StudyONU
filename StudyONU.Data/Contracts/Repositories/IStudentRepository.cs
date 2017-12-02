using System.Collections.Generic;
using System.Threading.Tasks;
using StudyONU.Core.Entities;

namespace StudyONU.Data.Contracts.Repositories
{
    public interface IStudentRepository : IRepository<StudentEntity>
    {
        Task<StudentEntity> GetByEmailAsync(string email);

        Task<IEnumerable<StudentEntity>> GetByCourseAsnyc(int courseId);
    }
}
