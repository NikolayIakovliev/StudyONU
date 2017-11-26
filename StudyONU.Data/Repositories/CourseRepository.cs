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

        public async Task<CourseEntity> GetDetailedAsync(int id)
        {
            CourseEntity course = await context.Courses
                .Include(courseEntity => courseEntity.Guides)
                .Include(courseEntity => courseEntity.Speciality)
                .Include(courseEntity => courseEntity.Lecturer)
                .ThenInclude(lecturerEntity => lecturerEntity.User)
                .FirstOrDefaultAsync(courseEntity => courseEntity.Id == id);

            return course;
        }

        public override async Task<IEnumerable<CourseEntity>> GetAllAsync(Expression<Func<CourseEntity, bool>> expression = null)
        {
            IQueryable<CourseEntity> entities = context.Courses
                .Include(course => course.Speciality)
                .Include(course => course.Lecturer)
                .ThenInclude(lecturer => lecturer.User);

            if (expression != null)
            {
                entities = entities.Where(expression);
            }

            return await entities.ToListAsync();
        }

        public async Task<IEnumerable<CourseEntity>> GetAllByStudentEmailAsync<TKey>(string email, Expression<Func<CourseEntity, TKey>> keySelector)
        {
            StudentEntity studentEntity = await context.Students.FirstAsync(student => student.User.Email == email);

            return await GetAllOrderedAsync(course =>
                course.Students.Select(student => student.StudentId).Contains(studentEntity.Id),
                keySelector);
        }

        public Task<IEnumerable<CourseEntity>> GetAllByLecturerEmailAsync<TKey>(string email, Expression<Func<CourseEntity, TKey>> keySelector)
        {
            return GetAllOrderedAsync(course => course.Lecturer.User.Email == email, keySelector);
        }

        public async Task<IEnumerable<CourseEntity>> GetRecommendedAsync(int studentQueueId)
        {
            StudentQueueEntity studentEntity = await context.StudentQueue.FirstOrDefaultAsync(student => student.Id == studentQueueId);

            return await GetAllOrderedAsync(course =>
                course.CourseNumber == studentEntity.CourseNumber &&
                course.SpecialityId == studentEntity.SpecialityId,
                course => course.Name);
        }

        public async Task<IEnumerable<CourseEntity>> GetAllOrderedAsync<TKey>(Expression<Func<CourseEntity, bool>> expression, Expression<Func<CourseEntity, TKey>> keySelector)
        {
            return await context.Courses
                .Include(course => course.Speciality)
                .Include(course => course.Lecturer)
                .ThenInclude(lecturer => lecturer.User)
                .Where(expression)
                .OrderBy(keySelector)
                .ToListAsync();
        }
    }
}
