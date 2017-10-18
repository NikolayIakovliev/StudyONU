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
    public class CourseRepository : RepositoryBase<CourseEntity>, ICourseRepository
    {
        public CourseRepository(StudyONUDbContext context)
            : base(context) { }

        public override async Task<IEnumerable<CourseEntity>> GetAllAsync(Expression<Func<CourseEntity, bool>> expression = null)
        {
            IQueryable<CourseEntity> entities = expression != null
                ? context.Courses.Include(course => course.Speciality).Where(expression)
                : context.Courses.Include(course => course.Speciality);

            return await entities.ToListAsync();
        }
    }
}
