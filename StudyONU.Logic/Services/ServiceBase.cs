using AutoMapper;
using StudyONU.Data.Contracts;
using StudyONU.Logic.Contracts;

namespace StudyONU.Logic.Services
{
    public abstract class ServiceBase
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

        public void Dispose() => unitOfWork.Dispose();
    }
}
