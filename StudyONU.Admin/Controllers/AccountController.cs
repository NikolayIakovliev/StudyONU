using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Models.Account;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.Contracts.Services.Authentication;
using StudyONU.Logic.DTO.Account;
using StudyONU.Logic.DTO.Authorization;
using StudyONU.Logic.Infrastructure;
using System.Threading.Tasks;

namespace StudyONU.Admin.Controllers
{
    [Authorize]
    public class AccountController : ApiController
    {
        private readonly ITokenService tokenService;
        private readonly IAccountService accountService;
        private readonly IMapper mapper;

        public AccountController(
            ITokenService tokenService,
            IAccountService accountService,
            IMapper mapper
            )
        {
            this.tokenService = tokenService;
            this.accountService = accountService;
            this.mapper = mapper;
        }

        [HttpPost]
        [Route("/api/token")]
        [AllowAnonymous]
        public async Task<IActionResult> GenerateToken([FromBody] LoginBindingModel model)
        {
            LoginDTO loginDTO = mapper.Map<LoginDTO>(model);

            DataServiceMessage<UserInfoDTO> serviceMessage = await tokenService.GenerateTokenAsync(loginDTO, LoginSettings.Administration);

            return GenerateResponse(serviceMessage);
        }

        [HttpPost]
        [Route("/api/check")]
        public IActionResult IsTokenValid() => Ok();

        [HttpPost]
        [Route("/api/account/password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordBindingModel model)
        {
            ChangePasswordDTO changePasswordDTO = mapper.Map<ChangePasswordDTO>(model);
            changePasswordDTO.Email = GetUserEmail();

            ServiceMessage serviceMessage = await accountService.ChangePasswordAsync(changePasswordDTO);

            return GenerateResponse(serviceMessage);
        }

        [HttpPut]
        [Route("/api/account")]
        public async Task<IActionResult> Edit([FromBody] UserEditBindingModel model)
        {
            UserEditDTO userEditDTO = mapper.Map<UserEditDTO>(model);
            userEditDTO.OldEmail = GetUserEmail();

            ServiceMessage serviceMessage = await accountService.EditAsync(userEditDTO);

            return GenerateResponse(serviceMessage);
        }
    }
}
