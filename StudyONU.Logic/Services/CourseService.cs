using AutoMapper;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Course;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Logic.Services
{
    public class CourseService : ServiceBase, ICourseService
    {
        public CourseService(
            IUnitOfWork unitOfWork,
            IMapper mapper, 
            IExceptionMessageBuilder exceptionMessageBuilder
            ) : base(unitOfWork, mapper, exceptionMessageBuilder) { }

        public async Task<ServiceMessage> CreateAsync(CourseCreateDTO courseCreateDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();

            try
            {
                LecturerEntity lecturerEntity = await unitOfWork.Lecturers.GetAsync(lecturer => lecturer.User.Email == courseCreateDTO.LecturerEmail);
                if (lecturerEntity != null)
                {
                    SpecialityEntity specialityEntity = await unitOfWork.Specialities.GetAsync(courseCreateDTO.SpecialityId);
                    if (specialityEntity != null)
                    {
                        CourseEntity courseEntity = mapper.Map<CourseEntity>(courseCreateDTO);
                        courseEntity.Lecturer = lecturerEntity;
                        courseEntity.Speciality = specialityEntity;

                        await unitOfWork.Courses.AddAsync(courseEntity);
                        await unitOfWork.CommitAsync();
                    }
                    else
                    {
                        actionResult = ServiceActionResult.NotFound;
                        errors.Add("Speciality was not found");
                    }
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

            return new ServiceMessage
            {
                ActionResult = actionResult,
                Errors = errors
            };
        }
    }
}
