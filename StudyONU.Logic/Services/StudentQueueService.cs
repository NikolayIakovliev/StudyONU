using AutoMapper;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.StudentQueue;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Logic.Services
{
    public class StudentQueueService : ServiceBase, IStudentQueueService
    {
        private readonly IPasswordHasher passwordHasher;

        public StudentQueueService(
            IUnitOfWork unitOfWork, 
            IMapper mapper,
            IExceptionMessageBuilder exceptionMessageBuilder,
            IPasswordHasher passwordHasher
            ) : base(unitOfWork, mapper, exceptionMessageBuilder)
        {
            this.passwordHasher = passwordHasher;
        }

        public async Task<ServiceMessage> CreateAsync(StudentQueueCreateDTO studentQueueCreateDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();

            try
            {
                UserEntity userEntity = await unitOfWork.Users.GetByEmailAsync(studentQueueCreateDTO.Email);
                StudentQueueEntity studentQueueEntity = await unitOfWork.StudentQueue.GetByEmailAsync(studentQueueCreateDTO.Email);
                if (userEntity == null && studentQueueEntity == null)
                {
                    SpecialityEntity specialityEntity = await unitOfWork.Specialities.GetAsync(studentQueueCreateDTO.SpecialityId);
                    if (specialityEntity != null)
                    {
                        studentQueueEntity = mapper.Map<StudentQueueEntity>(studentQueueCreateDTO);
                        studentQueueEntity.Speciality = specialityEntity;

                        await unitOfWork.StudentQueue.AddAsync(studentQueueEntity);
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
                    actionResult = ServiceActionResult.Error;
                    errors.Add("User with such email already exists");
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

        public async Task<DataServiceMessage<StudentRegisteredDTO>> ApproveAsync(int id)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();
            StudentRegisteredDTO data = null;

            try
            {
                StudentQueueEntity studentQueueEntity = await unitOfWork.StudentQueue.GetAsync(id);
                if (studentQueueEntity != null)
                {
                    studentQueueEntity.Approved = true;
                    studentQueueEntity.DateApproved = DateTime.Now;

                    string password = studentQueueEntity.Email;// passwordHasher.HashPassword(studentQueueEntity.Email);

                    UserEntity userEntity = mapper.Map<UserEntity>(studentQueueEntity);
                    userEntity.PasswordHash = password;
                    userEntity.Role = await unitOfWork.Roles.GetAsync(role => role.Name == Roles.Student);

                    StudentEntity studentEntity = new StudentEntity
                    {
                        CourseNumber = studentQueueEntity.CourseNumber,
                        SpecialityId = studentQueueEntity.SpecialityId,
                        Speciality = studentQueueEntity.Speciality,
                        User = userEntity
                    };

                    await unitOfWork.Students.AddAsync(studentEntity);
                    await unitOfWork.CommitAsync();

                    data = new StudentRegisteredDTO
                    {
                        Email = studentQueueEntity.Email,
                        GeneratedPassword = password
                    };
                }
                else
                {
                    actionResult = ServiceActionResult.NotFound;
                    errors.Add("Student was not found");
                }
            }
            catch (Exception exception)
            {
                exceptionMessageBuilder.FillErrors(exception, errors);
                actionResult = ServiceActionResult.Exception;
            }

            return new DataServiceMessage<StudentRegisteredDTO>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }

        public async Task<DataServiceMessage<StudentRegisteredDTO>> DisapproveAsync(int id)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();
            StudentRegisteredDTO data = null;

            try
            {
                StudentQueueEntity studentQueueEntity = await unitOfWork.StudentQueue.GetAsync(id);
                if (studentQueueEntity != null)
                {
                    studentQueueEntity.Approved = false;
                    studentQueueEntity.DateApproved = DateTime.Now;

                    await unitOfWork.CommitAsync();
                    
                    data = new StudentRegisteredDTO
                    {
                        Email = studentQueueEntity.Email
                    };
                }
                else
                {
                    actionResult = ServiceActionResult.NotFound;
                    errors.Add("Student was not found");
                }
            }
            catch (Exception exception)
            {
                exceptionMessageBuilder.FillErrors(exception, errors);
                actionResult = ServiceActionResult.Exception;
            }

            return new DataServiceMessage<StudentRegisteredDTO>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }

        public Task<DataServiceMessage<IEnumerable<StudentQueueListDTO>>> GetAllAsync()
        {
            Func<Task<IEnumerable<StudentQueueEntity>>> factory =
                () => unitOfWork.StudentQueue.GetAllOrderedAsync(
                    studentEntity => true,
                    studentEntity => studentEntity.DateCreated
                    );

            return GetAllAsync(factory);
        }

        public Task<DataServiceMessage<IEnumerable<StudentQueueListDTO>>> GetUnapprovedAsync()
        {
            Func<Task<IEnumerable<StudentQueueEntity>>> factory =
                () => unitOfWork.StudentQueue.GetAllOrderedAsync(
                    studentEntity => !studentEntity.Approved.HasValue, 
                    studentEntity => studentEntity.DateCreated
                    );

            return GetAllAsync(factory);
        }

        private async Task<DataServiceMessage<IEnumerable<StudentQueueListDTO>>> GetAllAsync(Func<Task<IEnumerable<StudentQueueEntity>>> factory)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();
            IEnumerable<StudentQueueListDTO> data = null;

            try
            {
                IEnumerable<StudentQueueEntity> courseEntities = await factory();
                data = mapper.Map<IEnumerable<StudentQueueListDTO>>(courseEntities);
            }
            catch (Exception exception)
            {
                exceptionMessageBuilder.FillErrors(exception, errors);
                actionResult = ServiceActionResult.Exception;
            }

            return new DataServiceMessage<IEnumerable<StudentQueueListDTO>>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }
    }
}
