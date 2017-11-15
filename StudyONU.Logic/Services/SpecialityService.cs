using AutoMapper;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Speciality;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudyONU.Logic.Services
{
    public class SpecialityService : ServiceBase, ISpecialityService
    {
        public SpecialityService(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ILogger logger) 
            : base(unitOfWork, mapper, logger) { }

        public async Task<ServiceMessage> CreateAsync(string name)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            try
            {
                SpecialityEntity specialityEntity = new SpecialityEntity
                {
                    Name = name
                };

                await unitOfWork.Specialities.AddAsync(specialityEntity);
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

        public async Task<ServiceMessage> EditAsync(SpecialityDTO specialityDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            try
            {
                SpecialityEntity specialityEntity = await unitOfWork.Specialities.GetAsync(specialityDTO.Id);
                if (specialityEntity != null)
                {
                    specialityEntity.Name = specialityDTO.Name;
                    await unitOfWork.CommitAsync();
                }
                else
                {
                    errors.AddCommonError("Speciality was not found");
                    actionResult = ServiceActionResult.NotFound;
                }
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

        public async Task<ServiceMessage> DeleteAsync(int id)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            try
            {
                SpecialityEntity specialityEntity = await unitOfWork.Specialities.GetAsync(id);
                if (specialityEntity != null)
                {
                    unitOfWork.Specialities.Remove(specialityEntity);
                    await unitOfWork.CommitAsync();
                }
                else
                {
                    errors.AddCommonError("Speciality was not found");
                    actionResult = ServiceActionResult.NotFound;
                }
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

        public async Task<DataServiceMessage<IEnumerable<SpecialityDTO>>> GetAllAsync()
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();
            IEnumerable<SpecialityDTO> data = null;

            try
            {
                IEnumerable<SpecialityEntity> speacialityEntities = await unitOfWork.Specialities.GetAllAsync();
                data = mapper.Map<IEnumerable<SpecialityDTO>>(speacialityEntities)
                    .OrderBy(speaciality => speaciality.Name)
                    .ToList();
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
                actionResult = ServiceActionResult.Exception;
                errors.AddExceptionError();
            }

            return new DataServiceMessage<IEnumerable<SpecialityDTO>>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }
    }
}
