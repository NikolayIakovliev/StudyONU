﻿using StudyONU.Logic.DTO.Account;
using StudyONU.Logic.Infrastructure;
using System;
using System.Threading.Tasks;

namespace StudyONU.Logic.Contracts.Services
{
    public interface IAccountService : IDisposable
    {
        Task<ServiceMessage> InitializeRoles();

        Task<ServiceMessage> RegisterAdminAsync(RegisterAdminDTO adminDTO);

        Task<ServiceMessage> ChangePasswordAsync(ChangePasswordDTO changePasswordDTO);
    }
}
