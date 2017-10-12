using AutoMapper;
using StudyONU.Data.Contracts;
using StudyONU.Logic.Contracts;

namespace StudyONU.Logic.Services
{
    public abstract class ServiceBase
    {
        protected readonly IUnitOfWork unitOfWork;
        protected readonly IMapper mapper;
        protected readonly IExceptionMessageBuilder exceptionMessageBuilder;

        public ServiceBase(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IExceptionMessageBuilder exceptionMessageBuilder
            )
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.exceptionMessageBuilder = exceptionMessageBuilder;
        }

        public void Dispose()
        {
            unitOfWork.Dispose();
        }
    }
}
