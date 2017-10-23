using StudyONU.Logic.DTO.Account;
using StudyONU.Logic.DTO.Authorization;
using StudyONU.Logic.Infrastructure;
using System;
using System.Threading.Tasks;

namespace StudyONU.Logic.Contracts.Services.Authentication
{
    public interface ITokenService : IDisposable
    {
        Task<DataServiceMessage<UserInfoDTO>> GenerateTokenAsync(LoginDTO loginDTO);
    }
}
