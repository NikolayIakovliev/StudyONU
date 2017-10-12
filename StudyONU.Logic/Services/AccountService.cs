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
    }
}
