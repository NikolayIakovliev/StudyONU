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
        private readonly IPasswordHasher passwordHasher;

        public LecturerService(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IExceptionMessageBuilder exceptionMessageBuilder,
            IPasswordHasher passwordHasher
            )
            : base(unitOfWork, mapper, exceptionMessageBuilder) {
            this.passwordHasher = passwordHasher;
        }

        public async Task<DataServiceMessage<string>> CreateAsync(LecturerCreateDTO lecturerCreateDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();
            string data = null;

            try
            {
                UserEntity userEntity = await unitOfWork.Users.GetByEmailAsync(lecturerCreateDTO.Email);
                if (userEntity == null)
                {
                    string password = "test@test.ua";// passwordHasher.HashPassword(lecturerCreateDTO.Email);

                    userEntity = mapper.Map<UserEntity>(lecturerCreateDTO);
                    userEntity.PasswordHash = passwordHasher.HashPassword(password);
                    userEntity.Role = await unitOfWork.Roles.GetAsync(role => role.Name == Roles.Lecturer);

                    LecturerEntity lecturerEntity = new LecturerEntity
                    {
                        User = userEntity
                    };

                    await unitOfWork.Lecturers.AddAsync(lecturerEntity);
                    await unitOfWork.CommitAsync();

                    data = password;
                }
                else
                {
                    actionResult = ServiceActionResult.Error;
                    errors.Add("User with such E-Mail already exists");
                }
            }
            catch (Exception exception)
            {
                exceptionMessageBuilder.FillErrors(exception, errors);
                actionResult = ServiceActionResult.Exception;
            }

            return new DataServiceMessage<string>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }

        public async Task<ServiceMessage> EditAsync(LecturerEditDTO lecturerEditDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();

            try
            {
                LecturerEntity lecturerEntity = await unitOfWork.Lecturers.GetAsync(lecturerEditDTO.Id);
                if (lecturerEntity != null)
                {
                    lecturerEntity.User.FirstName = lecturerEditDTO.FirstName;
                    lecturerEntity.User.LastName = lecturerEditDTO.LastName;
                    lecturerEntity.User.Patronymic = lecturerEditDTO.Patronymic;

                    await unitOfWork.CommitAsync();
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

        public async Task<ServiceMessage> DeleteAsync(int id)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();

            try
            {
                LecturerEntity lecturerEntity = await unitOfWork.Lecturers.GetAsync(id);
                if (lecturerEntity != null)
                {
                    unitOfWork.Lecturers.Remove(lecturerEntity);
                    await unitOfWork.CommitAsync();
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

        public async Task<DataServiceMessage<IEnumerable<LecturerListDTO>>> GetAllAsync()
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();
            IEnumerable<LecturerListDTO> data = null;

            try
            {
                IEnumerable<LecturerEntity> lecturerEntities = await unitOfWork.Lecturers.GetAllAsync();
                data = mapper.Map<IEnumerable<LecturerListDTO>>(lecturerEntities)
                    .OrderBy(lecturer => lecturer.LastName)
                    .ThenBy(lecturer => lecturer.FirstName)
                    .ThenBy(lecturer => lecturer.Patronymic)
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
