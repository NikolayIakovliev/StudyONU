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
            ILogger logger) 
            : base(unitOfWork, mapper, logger) { }

        public async Task<ServiceMessage> CreateAsync(GuideCreateDTO guideCreateDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

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
                    errors.AddCommonError("Course was not found");
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

        public async Task<ServiceMessage> EditAsync(GuideEditDTO guideEditDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            try
            {
                GuideEntity guideEntity = await unitOfWork.Guides.GetAsync(guideEditDTO.Id);
                if (guideEntity != null)
                {
                    guideEntity.Name = guideEditDTO.Name;
                    guideEntity.DateAvailable = guideEditDTO.DateAvailable;
                    if (!String.IsNullOrEmpty(guideEditDTO.FilePath))
                    {
                        guideEntity.FilePath = guideEditDTO.FilePath;
                    }

                    await unitOfWork.CommitAsync();
                }
                else
                {
                    errors.AddCommonError("Guide was not found");
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
                GuideEntity guideEntity = await unitOfWork.Guides.GetAsync(id);
                if (guideEntity != null)
                {
                    unitOfWork.Guides.Remove(guideEntity);
                    await unitOfWork.CommitAsync();
                }
                else
                {
                    errors.AddCommonError("Guide was not found");
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

        public async Task<DataServiceMessage<GuideDetailsDTO>> GetByIdAsync(int id)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();
            GuideDetailsDTO data = null;

            try
            {
                GuideEntity guideEntity = await unitOfWork.Guides.GetAsync(id);
                if (guideEntity != null)
                {
                    data = mapper.Map<GuideDetailsDTO>(guideEntity);
                }
                else
                {
                    actionResult = ServiceActionResult.NotFound;
                    errors.AddCommonError("Guide was not found");
                }
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
                actionResult = ServiceActionResult.Exception;
                errors.AddExceptionError();
            }

            return new DataServiceMessage<GuideDetailsDTO>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }

        public async Task<DataServiceMessage<IEnumerable<GuideListDTO>>> GetByLecturerEmailAsync(string email)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();
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
                    errors.AddCommonError("Lecturer was not found");
                }
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
                actionResult = ServiceActionResult.Exception;
                errors.AddExceptionError();
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
