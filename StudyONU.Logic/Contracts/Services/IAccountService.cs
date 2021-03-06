﻿using StudyONU.Logic.DTO.Account;
using StudyONU.Logic.Infrastructure;
using System;
using System.Threading.Tasks;

namespace StudyONU.Logic.Contracts.Services
{
    public interface IAccountService : IDisposable
    {
        Task<ServiceMessage> InitializeRoles();

        Task<ServiceMessage> RegisterAdminAsync(RegisterUserDTO adminDTO);

        Task<ServiceMessage> RegisterDeveloperAsync(RegisterUserDTO developerDTO);

        Task<ServiceMessage> EditAsync(UserEditDTO userEditDTO);

        Task<ServiceMessage> ChangePasswordAsync(ChangePasswordDTO changePasswordDTO);

        Task<ServiceMessage> IsStudentEmailUnique(string email);

        Task<ServiceMessage> IsLecturerEmailUnique(string email);
    }
}
