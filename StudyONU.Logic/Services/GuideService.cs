using AutoMapper;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Guide;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudyONU.Logic.Services
{
    public class GuideService : ServiceBase, IGuideService
    {
        public GuideService(
            IUnitOfWork unitOfWork, 
            IMapper mapper,
            IExceptionMessageBuilder exceptionMessageBuilder) 
            : base(unitOfWork, mapper, exceptionMessageBuilder) { }

        public async Task<ServiceMessage> CreateAsync(GuideCreateDTO guideCreateDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();

            try
            {
                CourseEntity courseEntity = await unitOfWork.Courses.GetAsync(guideCreateDTO.CourseId);
                if (courseEntity != null)
                {
                    GuideEntity guideEntity = mapper.Map<GuideEntity>(guideCreateDTO);
                    guideEntity.Course = courseEntity;

                    await unitOfWork.Guides.AddAsync(guideEntity);
                    await unitOfWork.CommitAsync();
                }
                else
                {
                    actionResult = ServiceActionResult.NotFound;
                    errors.Add("Course was not found");
                }
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

        public async Task<DataServiceMessage<IEnumerable<GuideListDTO>>> GetByLecturerEmailAsync(string email)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();
            IEnumerable<GuideListDTO> data = null;

            try
            {
                LecturerEntity lecturerEntity = await unitOfWork.Lecturers.GetByEmailAsync(email);
                if (lecturerEntity != null)
                {
                    IEnumerable<GuideEntity> guideEntities = await unitOfWork.Guides.GetByLecturerIdAsync(lecturerEntity.Id);
                    data = mapper.Map<IEnumerable<GuideListDTO>>(guideEntities)
                        .OrderBy(guide => guide.Name)
                        .ToList();
                }
                else
                {
                    actionResult = ServiceActionResult.NotFound;
                    errors.Add("Lecturer was not found");
                }
            }
            catch (Exception exception)
            {
                exceptionMessageBuilder.FillErrors(exception, errors);
                actionResult = ServiceActionResult.Exception;
            }

            return new DataServiceMessage<IEnumerable<GuideListDTO>>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }
    }
}
