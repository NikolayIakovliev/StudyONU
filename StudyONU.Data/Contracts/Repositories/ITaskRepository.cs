﻿using StudyONU.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace StudyONU.Data.Contracts.Repositories
{
    public interface ITaskRepository : IRepository<TaskEntity>
    {
        Task<TaskEntity> GetDetailedAsync(int id);

        Task<IEnumerable<TaskEntity>> GetAllAvailableAsync(int courseId);

        Task<IEnumerable<TaskEntity>> GetAllByLecturerIdAsync(int id);

        Task<IEnumerable<TaskEntity>> GetAllByLecturerIdOrderedAsync<TKey>(int id, Expression<Func<TaskEntity, TKey>> keySelector);

        Task<IEnumerable<TaskEntity>> GetByCourseAsync(int courseId);
    }
}
