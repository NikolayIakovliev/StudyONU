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

        public async Task<ServiceMessage> EditAsync(CourseEditDTO courseEditDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();

            try
            {
                CourseEntity courseEntity = await unitOfWork.Courses.GetAsync(courseEditDTO.Id);
                if (courseEntity != null)
                {
                    SpecialityEntity specialityEntity = await unitOfWork.Specialities.GetAsync(courseEditDTO.SpecialityId);
                    if (specialityEntity != null)
                    {
                        courseEntity.Name = courseEditDTO.Name;
                        courseEntity.IsPublished = courseEditDTO.IsPublished;
                        courseEntity.CourseNumber = courseEditDTO.CourseNumber;
                        courseEntity.SpecialityId = courseEditDTO.SpecialityId;
                        courseEntity.Speciality = specialityEntity;

                        await unitOfWork.CommitAsync();
                    }
                    else
                    {
                        errors.Add("Speciality was not found");
                        actionResult = ServiceActionResult.NotFound;
                    }
                }
                else
                {
                    errors.Add("Course was not found");
                    actionResult = ServiceActionResult.NotFound;
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

        public async Task<ServiceMessage> DeleteAsync(int id)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();

            try
            {
                CourseEntity courseEntity = await unitOfWork.Courses.GetAsync(id);
                if (courseEntity != null)
                {
                    unitOfWork.Courses.Remove(courseEntity);
                    await unitOfWork.CommitAsync();
                }
                else
                {
                    errors.Add("Course was not found");
                    actionResult = ServiceActionResult.NotFound;
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

        public async Task<DataServiceMessage<IEnumerable<CourseListDTO>>> GetByLecturerEmailAsync(string email)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();
            IEnumerable<CourseListDTO> data = null;

            try
            {
                LecturerEntity lecturerEntity = await unitOfWork.Lecturers.GetByEmailAsync(email);
                if (lecturerEntity != null)
                {
                    IEnumerable<CourseEntity> courseEntities = await unitOfWork.Courses.GetAllByLecturerIdOrderedAsync(lecturerEntity.Id, course => course.Name);
                    data = mapper.Map<IEnumerable<CourseListDTO>>(courseEntities);
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

            return new DataServiceMessage<IEnumerable<CourseListDTO>>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }
    }
}
