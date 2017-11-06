using AutoMapper;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Account;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyONU.Logic.Services
{
    public class AccountService : ServiceBase, IAccountService
    {
        private readonly IPasswordHasher passwordHasher;

        public AccountService(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IExceptionMessageBuilder exceptionMessageBuilder,
            IPasswordHasher passwordHasher
            )
            : base(unitOfWork, mapper, exceptionMessageBuilder)
        {
            this.passwordHasher = passwordHasher;
        }

        public async Task<ServiceMessage> RegisterAdminAsync(RegisterAdminDTO adminDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();

            try
            {
                AdminEntity adminEntity = await unitOfWork.Admins.GetByEmailAsync(adminDTO.Email);
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

        public async Task<ServiceMessage> InitializeRoles()
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();

            try
            {
                foreach (string roleName in Roles.GetRoles())
                {
                    RoleEntity roleEntity = await unitOfWork.Roles.GetAsync(applicationRole => applicationRole.Name == roleName);
                    if (roleEntity == null)
                    {
                        RoleEntity applicationRole = new RoleEntity
                        {
                            Name = roleName
                        };

                        await unitOfWork.Roles.AddAsync(applicationRole);
                        await unitOfWork.CommitAsync();
                    }
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

        public async Task<ServiceMessage> ChangePasswordAsync(ChangePasswordDTO changePasswordDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();

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
                            errors.Add("Old password is incorrect");
                        }
                    }
                    else
                    {
                        actionResult = ServiceActionResult.NotFound;
                        errors.Add("User was not found");
                    }
                }
                catch (Exception exception)
                {
                    exceptionMessageBuilder.FillErrors(exception, errors);
                    actionResult = ServiceActionResult.Exception;
                }
            }
            else
            {
                actionResult = ServiceActionResult.Error;
                errors.Add("Passwords don't match");
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
            List<string> errors = new List<string>();

            try
            {
                UserEntity userEntity = await unitOfWork.Users.GetByEmailAsync(email);
                StudentQueueEntity studentQueueEntity = await unitOfWork.StudentQueue.GetByEmailAsync(email);
                if (userEntity != null || studentQueueEntity != null)
                {
                    actionResult = ServiceActionResult.Error;
                    errors.Add("Email is already being used");
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
