﻿using Microsoft.EntityFrameworkCore;
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
    public class GuideRepository : RepositoryBase<GuideEntity>, IGuideRepository
    {
        public GuideRepository(StudyONUDbContext context)
            : base(context) { }

        public override Task<GuideEntity> GetAsync(int id)
        {
            return context.Guides
                .Include(guide => guide.Course)
                .FirstOrDefaultAsync(guide => guide.Id == id);
        }

        public override async Task<IEnumerable<GuideEntity>> GetAllAsync(Expression<Func<GuideEntity, bool>> expression = null)
        {
            IQueryable<GuideEntity> entities = expression != null
                ? context.Guides.Include(guide => guide.Course).Where(expression)
                : context.Guides.Include(guide => guide.Course);

            return await entities.ToListAsync();
        }

        public async Task<IEnumerable<GuideEntity>> GetByLecturerIdAsync(int id)
        {
            return await context.Guides
                .Include(guide => guide.Course)
                .Where(guide => guide.Course.LecturerId == id)
                .ToListAsync();
        }

        public async Task<IEnumerable<GuideEntity>> GetAvailableByCourseAsync(int courseId)
        {
            return await context.Guides
                .Where(guide =>
                    guide.CourseId == courseId &&
                    (guide.Course.IsPublished ||
                    !guide.DateAvailable.HasValue ||
                    guide.DateAvailable.Value <= DateTime.Now
                    )
                )
                .ToListAsync();
        }
    }
}
