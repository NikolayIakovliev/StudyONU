using AutoMapper;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Account;
using StudyONU.Logic.Infrastructure;
using System;
using System.Threading.Tasks;

namespace StudyONU.Logic.Services
{
    public class AccountService : ServiceBase, IAccountService
    {
        private readonly IPasswordHasher passwordHasher;

        public AccountService(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ILogger logger,
            IPasswordHasher passwordHasher
            )
            : base(unitOfWork, mapper, logger)
        {
            this.passwordHasher = passwordHasher;
        }

        public async Task<ServiceMessage> InitializeRoles()
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            try
            {
                foreach (var role in Roles.GetRoles())
                {
                    RoleEntity roleEntity = await unitOfWork.Roles.GetAsync(applicationRole => applicationRole.Name == role.Key);
                    if (roleEntity == null)
                    {
                        RoleEntity applicationRole = new RoleEntity
                        {
                            Name = role.Key,
                            DisplayName = role.Value
                        };

                        await unitOfWork.Roles.AddAsync(applicationRole);
                        await unitOfWork.CommitAsync();
                    }
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

        public async Task<ServiceMessage> RegisterAdminAsync(RegisterUserDTO adminDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            try
            {
                AdminEntity adminEntity = await unitOfWork.Admins.GetAsync(admin => true);
                if (adminEntity == null)
                {
                    adminEntity = new AdminEntity
                    {
                        User = new UserEntity
                        {
                            FirstName = adminDTO.FirstName,
                            LastName = adminDTO.LastName,
                            Patronymic = adminDTO.Patronymic,
                            Email = adminDTO.Email,
                            PhotoPath = adminDTO.PhotoPath,
                            PasswordHash = passwordHasher.HashPassword(adminDTO.Password),
                            Role = await unitOfWork.Roles.GetAsync(role => role.Name == Roles.Admin)
                        }
                    };

                    await unitOfWork.Admins.AddAsync(adminEntity);
                    await unitOfWork.CommitAsync();
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

        public async Task<ServiceMessage> RegisterDeveloperAsync(RegisterUserDTO developerDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            try
            {
                UserEntity developerEntity = await unitOfWork.Users.GetAsync(user => user.Role.Name == Roles.Developer);
                if (developerEntity == null)
                {
                    developerEntity = new UserEntity
                    {
                        FirstName = developerDTO.FirstName,
                        LastName = developerDTO.LastName,
                        Patronymic = developerDTO.Patronymic,
                        Email = developerDTO.Email,
                        PhotoPath = developerDTO.PhotoPath,
                        PasswordHash = passwordHasher.HashPassword(developerDTO.Password),
                        Role = await unitOfWork.Roles.GetAsync(role => role.Name == Roles.Developer)
                    };

                    await unitOfWork.Users.AddAsync(developerEntity);
                    await unitOfWork.CommitAsync();
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

        public async Task<ServiceMessage> EditAsync(UserEditDTO userEditDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            try
            {
                UserEntity userEntity = await unitOfWork.Users.GetByEmailAsync(userEditDTO.OldEmail);
                if (userEntity != null)
                {
                    userEntity.FirstName = userEditDTO.FirstName;
                    userEntity.LastName = userEditDTO.LastName;
                    userEntity.Patronymic = userEditDTO.Patronymic;
                    userEntity.Email = userEditDTO.NewEmail;

                    await unitOfWork.CommitAsync();
                }
                else
                {
                    actionResult = ServiceActionResult.Error;
                    errors.AddCommonError("User with such email was not found");
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

        public async Task<ServiceMessage> ChangePasswordAsync(ChangePasswordDTO changePasswordDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            if (changePasswordDTO.NewPassword == changePasswordDTO.Confirm)
            {
                try
                {
                    UserEntity userEntity = await unitOfWork.Users.GetByEmailAsync(changePasswordDTO.Email);
                    if (userEntity != null)
                    {
                        string hashPassword = userEntity.PasswordHash;
                        string oldPassword = changePasswordDTO.OldPassword;

                        bool verified = passwordHasher.VerifyHashedPassword(hashPassword, oldPassword);
                        if (verified)
                        {
                            string newPassword = changePasswordDTO.NewPassword;
                            userEntity.PasswordHash = passwordHasher.HashPassword(newPassword);

                            await unitOfWork.CommitAsync();
                        }
                        else
                        {
                            actionResult = ServiceActionResult.Error;
                            errors.AddCommonError("Old password is incorrect");
                        }
                    }
                    else
                    {
                        actionResult = ServiceActionResult.NotFound;
                        errors.AddCommonError("User was not found");
                    }
                }
                catch (Exception exception)
                {
                    logger.Fatal(exception);
                    actionResult = ServiceActionResult.Exception;
                    errors.AddExceptionError();
                }
            }
            else
            {
                actionResult = ServiceActionResult.Error;
                errors.AddCommonError("Passwords don't match");
            }

            return new ServiceMessage
            {
                ActionResult = actionResult,
                Errors = errors
            };
        }

        public async Task<ServiceMessage> IsUnique(string email)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();

            try
            {
                UserEntity userEntity = await unitOfWork.Users.GetByEmailAsync(email);
                StudentQueueEntity studentQueueEntity = await unitOfWork.StudentQueue.GetByEmailAsync(email);
                if (userEntity != null || studentQueueEntity != null)
                {
                    actionResult = ServiceActionResult.Error;
                    errors.AddCommonError("Email is already being used");
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
    }
}
