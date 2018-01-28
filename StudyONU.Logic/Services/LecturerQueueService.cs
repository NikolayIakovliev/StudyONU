using AutoMapper;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts;
using StudyONU.Data.Contracts.Repositories;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.LecturerQueue;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Logic.Services
{
    public class LecturerQueueService : ServiceBase, ILecturerQueueService
    {
        private readonly IPasswordHasher passwordHasher;

        public LecturerQueueService(
            IUnitOfWork unitOfWork,
            IPasswordHasher passwordHasher,
            IMapper mapper, 
            ILogger logger
            ) : base(unitOfWork, mapper, logger)
        {
            this.passwordHasher = passwordHasher;
        }

        public Task<ServiceMessage> CreateAsync(LecturerQueueCreateDTO lecturerDTO) =>
            CreateAsync<LecturerQueueCreateDTO, LecturerQueueEntity>(lecturerDTO);

        public async Task<DataServiceMessage<LecturerRegisteredDTO>> ApproveAsync(int id)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();
            LecturerRegisteredDTO data = null;

            try
            {
                actionResult = await SetApprovementAsync(id, true, async entity =>
                {
                    string password = passwordHasher.HashPassword(entity.Email);

                    UserEntity userEntity = mapper.Map<UserEntity>(entity);
                    
                    userEntity.Role = await unitOfWork.Roles.GetAsync(role => role.Name == Roles.Lecturer);
                    userEntity.PasswordHash = passwordHasher.HashPassword(password);

                    LecturerEntity lecturerEntity = new LecturerEntity
                    {
                        User = userEntity
                    };

                    await unitOfWork.Lecturers.AddAsync(lecturerEntity);

                    data = new LecturerRegisteredDTO
                    {
                        Email = entity.Email,
                        FirstName = entity.FirstName,
                        LastName = entity.LastName,
                        Patronymic = entity.Patronymic,
                        GeneratedPassword = password
                    };
                });

                if (actionResult == ServiceActionResult.NotFound)
                {
                    errors.AddCommonError("Lecturer was not found");
                }
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
                actionResult = ServiceActionResult.Exception;
                errors.AddExceptionError();
            }

            return new DataServiceMessage<LecturerRegisteredDTO>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }

        public async Task<DataServiceMessage<LecturerRegisteredDTO>> DisapproveAsync(int id)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();
            LecturerRegisteredDTO data = null;

            try
            {
                actionResult = await SetApprovementAsync(id, false, entity =>
                {
                    data = new LecturerRegisteredDTO
                    {
                        Email = entity.Email,
                        FirstName = entity.FirstName,
                        LastName = entity.LastName,
                        Patronymic = entity.Patronymic
                    };
                });
                
                if (actionResult == ServiceActionResult.NotFound)
                {
                    errors.AddCommonError("Lecturer was not found");
                }
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
                actionResult = ServiceActionResult.Exception;
                errors.AddExceptionError();
            }

            return new DataServiceMessage<LecturerRegisteredDTO>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }

        public Task<DataServiceMessage<IEnumerable<LecturerQueueListDTO>>> GetAwaitingAsync() =>
            GetAllAsync<LecturerQueueListDTO, LecturerQueueEntity>(entity => !entity.Approved.HasValue);

        private async Task<ServiceActionResult> SetApprovementAsync(int id, bool approved, Action<LecturerQueueEntity> callback)
        {
            IRepository<LecturerQueueEntity> repository = unitOfWork.GetRepository<LecturerQueueEntity>();
            LecturerQueueEntity entity = await repository.GetAsync(id);
            if (entity != null)
            {
                callback(entity);

                entity.Approved = approved;
                entity.DateApproved = DateTime.Now;

                await unitOfWork.CommitAsync();
                return ServiceActionResult.Success;
            }
            else
            {
                return ServiceActionResult.NotFound;
            }
        }
    }
}
