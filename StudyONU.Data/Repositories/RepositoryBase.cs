using Microsoft.EntityFrameworkCore;
using StudyONU.Core;
using StudyONU.Data.Contracts.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace StudyONU.Data.Repositories
{
    public abstract class RepositoryBase<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly StudyONUDbContext context;
        private readonly DbSet<TEntity> dbSet;

        public RepositoryBase(StudyONUDbContext context)
        {
            this.context = context;
            this.dbSet = context.Set<TEntity>();
        }

        public virtual Task AddAsync(TEntity entity)
        {
            return dbSet.AddAsync(entity);
        }

        public virtual void Remove(TEntity entity)
        {
            dbSet.Remove(entity);
        }

        public virtual Task<TEntity> GetAsync(int id)
        {
            return dbSet.FindAsync(id);
        }

        public virtual Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> expression)
        {
            return dbSet.FirstOrDefaultAsync(expression);
        }

        public virtual async Task<IEnumerable<TEntity>> GetAll(Expression<Func<TEntity, bool>> expression = null)
        {
            IQueryable<TEntity> entities = expression != null
                ? dbSet.Where(expression)
                : dbSet;

            return await entities.ToListAsync();
        }

        public virtual async Task<IEnumerable<TEntity>> GetAll(int skip, int take, Expression<Func<TEntity, bool>> expression = null)
        {
            IQueryable<TEntity> entities = expression != null
                ? dbSet.Where(expression)
                : dbSet;

            return await entities.Skip(skip).Take(take).ToListAsync();
        }
    }
}
