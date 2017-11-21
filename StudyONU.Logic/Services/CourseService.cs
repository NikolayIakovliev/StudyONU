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
            ILogger logger
            ) : base(unitOfWork, mapper, logger) { }

        public async Task<ServiceMessage> CreateAsync(CourseCreateDTO courseCreateDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

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
                        errors.AddCommonError("Speciality was not found");
                    }
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

            return new ServiceMessage
            {
                ActionResult = actionResult,
                Errors = errors
            };
        }

        public async Task<ServiceMessage> EditAsync(CourseEditDTO courseEditDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

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
                        errors.AddCommonError("Speciality was not found");
                        actionResult = ServiceActionResult.NotFound;
                    }
                }
                else
                {
                    errors.AddCommonError("Course was not found");
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
                CourseEntity courseEntity = await unitOfWork.Courses.GetAsync(id);
                if (courseEntity != null)
                {
                    unitOfWork.Courses.Remove(courseEntity);
                    await unitOfWork.CommitAsync();
                }
                else
                {
                    errors.AddCommonError("Course was not found");
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

        public async Task<DataServiceMessage<CourseDetailsDTO>> GetAsync(int id)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();
            CourseDetailsDTO data = null;

            try
            {
                CourseEntity courseEntity = await unitOfWork.Courses.GetDetailedAsync(id);
                if (courseEntity != null)
                {
                    data = mapper.Map<CourseDetailsDTO>(courseEntity);
                }
                else
                {
                    errors.AddCommonError("Course was not found");
                    actionResult = ServiceActionResult.NotFound;
                }
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
                actionResult = ServiceActionResult.Exception;
                errors.AddExceptionError();
            }

            return new DataServiceMessage<CourseDetailsDTO>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }

        public async Task<DataServiceMessage<CourseDetailsDTO>> GetAsync(int id, string studentEmail)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();
            CourseDetailsDTO data = null;

            try
            {
                CourseEntity courseEntity = await unitOfWork.Courses.GetDetailedAsync(id);
                if (courseEntity != null)
                {
                    StudentEntity studentEntity = await unitOfWork.Students.GetByEmailAsync(studentEmail);

                    bool isInCourse = 
                        studentEntity != null && 
                        await unitOfWork.StudentCourse.IsInCourse(studentEntity.Id, id);

                    bool hasAccess = courseEntity.IsPublished || isInCourse;

                    if (hasAccess)
                    {
                        data = mapper.Map<CourseDetailsDTO>(courseEntity);
                        data.ReadOnly = !isInCourse;
                    }
                    else
                    {
                        actionResult = ServiceActionResult.Error;
                        errors.AddAccessError("Student doesn't have an access to course");
                    }
                }
                else
                {
                    errors.AddCommonError("Course was not found");
                    actionResult = ServiceActionResult.NotFound;
                }
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
                actionResult = ServiceActionResult.Exception;
                errors.AddExceptionError();
            }

            return new DataServiceMessage<CourseDetailsDTO>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }

        public Task<DataServiceMessage<IEnumerable<CourseListDTO>>> GetByLecturerEmailAsync(string email)
        {
            Func<Task<IEnumerable<CourseEntity>>> factory =
                () => unitOfWork.Courses.GetAllByLecturerEmailAsync(email, course => course.Name);

            return GetAllAsync(factory);
        }

        public Task<DataServiceMessage<IEnumerable<CourseListDTO>>> GetByStudentEmailAsync(string email)
        {
            Func<Task<IEnumerable<CourseEntity>>> factory =
                () => unitOfWork.Courses.GetAllByStudentEmailAsync(email, course => course.Name);

            return GetAllAsync(factory);
        }

        public Task<DataServiceMessage<IEnumerable<CourseListDTO>>> GetRecommendedAsync(int studentQueueId)
        {
            Func<Task<IEnumerable<CourseEntity>>> factory =
                () => unitOfWork.Courses.GetRecommendedAsync(studentQueueId);

            return GetAllAsync(factory);
        }

        public Task<DataServiceMessage<IEnumerable<CourseListDTO>>> GetPublishedAsync()
        {
            Func<Task<IEnumerable<CourseEntity>>> factory =
                () => unitOfWork.Courses.GetAllOrderedAsync(course => course.IsPublished, course => course.Name);

            return GetAllAsync(factory);
        }

        private async Task<DataServiceMessage<IEnumerable<CourseListDTO>>> GetAllAsync(Func<Task<IEnumerable<CourseEntity>>> factory)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();
            IEnumerable<CourseListDTO> data = null;

            try
            {
                IEnumerable<CourseEntity> courseEntities = await factory();
                data = mapper.Map<IEnumerable<CourseListDTO>>(courseEntities);
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
                actionResult = ServiceActionResult.Exception;
                errors.AddExceptionError();
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
