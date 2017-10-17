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
            IExceptionMessageBuilder exceptionMessageBuilder) 
            : base(unitOfWork, mapper, exceptionMessageBuilder) { }

        public async Task<ServiceMessage> CreateAsync(string name)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();

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
                exceptionMessageBuilder.FillErrors(exception, errors);
                actionResult = ServiceActionResult.Exception;
            }

            return new ServiceMessage
            {
                ActionResult = actionResult,
                Errors = errors
            };
        }

        public async Task<DataServiceMessage<IEnumerable<SpecialityListDTO>>> GetAllAsync()
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();
            IEnumerable<SpecialityListDTO> data = null;

            try
            {
                IEnumerable<SpecialityEntity> speacialityEntities = await unitOfWork.Specialities.GetAllAsync();
                data = mapper.Map<IEnumerable<SpecialityListDTO>>(speacialityEntities)
                    .OrderBy(speaciality => speaciality.Name)
                    .ToList();
            }
            catch (Exception exception)
            {
                exceptionMessageBuilder.FillErrors(exception, errors);
                actionResult = ServiceActionResult.Exception;
            }

            return new DataServiceMessage<IEnumerable<SpecialityListDTO>>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }
    }
}
