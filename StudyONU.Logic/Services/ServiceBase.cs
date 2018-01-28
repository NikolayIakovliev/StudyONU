using AutoMapper;
using StudyONU.Data.Contracts;
using StudyONU.Data.Contracts.Repositories;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace StudyONU.Logic.Services
{
    public abstract class ServiceBase : IDisposable
    {
        protected readonly IUnitOfWork unitOfWork;
        protected readonly IMapper mapper;
        protected readonly ILogger logger;

        public ServiceBase(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ILogger logger
            )
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.logger = logger;
        }

        protected async Task<ServiceMessage> CreateAsync<TDTO, TEntity>(TDTO dto)
            where TDTO : class
            where TEntity : class
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            try
            {
                TEntity entity = mapper.Map<TEntity>(dto);

                IRepository<TEntity> repository = unitOfWork.GetRepository<TEntity>();
                await repository.AddAsync(entity);
                await unitOfWork.CommitAsync();
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
                actionResult = ServiceActionResult.Exception;
                errors.AddExceptionError();
            }

            return new ServiceMessage
            {
                ActionResult = actionResult,
                Errors = errors
            };
        }

        protected Task<DataServiceMessage<TDTO>> GetAsync<TDTO, TEntity>(int id)
            where TDTO : class
            where TEntity : class
        {
            return Decorate(async () =>
            {
                IRepository<TEntity> repository = unitOfWork.GetRepository<TEntity>();
                TEntity entity = await repository.GetAsync(id);

                return mapper.Map<TDTO>(entity);
            });
        }

        protected Task<DataServiceMessage<TDTO>> GetAsync<TDTO, TEntity>(Expression<Func<TEntity, bool>> expression)
            where TDTO : class
            where TEntity : class
        {
            return Decorate(async () =>
            {
                IRepository<TEntity> repository = unitOfWork.GetRepository<TEntity>();
                TEntity entity = await repository.GetAsync(expression);

                return mapper.Map<TDTO>(entity);
            });
        }

        protected Task<DataServiceMessage<IEnumerable<TDTO>>> GetAllAsync<TDTO, TEntity>(Expression<Func<TEntity, bool>> expression = null)
            where TDTO : class
            where TEntity : class
        {
            return Decorate(async () =>
            {
                IRepository<TEntity> repository = unitOfWork.GetRepository<TEntity>();
                IEnumerable<TEntity> entities = await repository.GetAllAsync(expression);

                return mapper.Map<IEnumerable<TDTO>>(entities);
            });
        }

        protected async Task<DataServiceMessage<TData>> Decorate<TData>(Func<Task<TData>> factory)
            where TData : class
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();
            TData data = null;

            try
            {
                data = await factory();
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
                actionResult = ServiceActionResult.Exception;
                errors.AddExceptionError();
            }

            return new DataServiceMessage<TData>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }

        public void Dispose() => unitOfWork.Dispose();
    }
}
