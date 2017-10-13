using AutoMapper;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Lecturer;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudyONU.Logic.Services
{
    public class LecturerService : ServiceBase, ILecturerService
    {
        public LecturerService(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IExceptionMessageBuilder exceptionMessageBuilder
            )
            : base(unitOfWork, mapper, exceptionMessageBuilder) { }

        public async Task<DataServiceMessage<IEnumerable<LecturerListDTO>>> GetAllAsync()
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();
            IEnumerable<LecturerListDTO> data = null;

            try
            {
                IEnumerable<LecturerEntity> lecturerEntities = await unitOfWork.Lecturers.GetAllAsync();
                data = mapper.Map<IEnumerable<LecturerListDTO>>(lecturerEntities)
                    .OrderBy(lecturer => lecturer.FullName)
                    .ToList();
            }
            catch (Exception exception)
            {
                exceptionMessageBuilder.FillErrors(exception, errors);
                actionResult = ServiceActionResult.Exception;
            }

            return new DataServiceMessage<IEnumerable<LecturerListDTO>>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }
    }
}
