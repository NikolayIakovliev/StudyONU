using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.Contracts.Services.Authentication;
using StudyONU.Logic.DTO.Account;
using StudyONU.Logic.DTO.Authorization;
using StudyONU.Logic.Infrastructure;
using StudyONU.Web.Helpers;
using StudyONU.Web.Models.Account;
using System.Threading.Tasks;

namespace StudyONU.Web.Controllers
{
    [Authorize]
    public class AccountController : ApiController
    {
        private readonly ITokenService tokenService;
        private readonly IAccountService accountService;
        private readonly IMapper mapper;
        private readonly DomainHelper domainHelper;

        public AccountController(
            ITokenService tokenService,
            IAccountService accountService,
            IMapper mapper,
            DomainHelper domainHelper
            )
        {
            this.tokenService = tokenService;
            this.accountService = accountService;
            this.mapper = mapper;
            this.domainHelper = domainHelper;
        }

        [HttpPost]
        [Route("/api/token")]
        [AllowAnonymous]
        public async Task<IActionResult> GenerateToken([FromBody] LoginBindingModel model)
        {
            LoginDTO loginDTO = mapper.Map<LoginDTO>(model);

            DataServiceMessage<UserInfoDTO> serviceMessage = await tokenService.GenerateTokenAsync(loginDTO, LoginSettings.Student);
            if (serviceMessage.ActionResult == ServiceActionResult.Success)
            {
                serviceMessage.Data.PhotoPath = domainHelper.PrependDomain(serviceMessage.Data.PhotoPath);
            }

            return GenerateResponse(serviceMessage);
        }

        [HttpPost]
        [Route("/api/check")]
        public IActionResult IsTokenValid() => Ok();

        [HttpPost]
        [Route("password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordBindingModel model)
        {
            ChangePasswordDTO changePasswordDTO = mapper.Map<ChangePasswordDTO>(model);
            changePasswordDTO.Email = GetUserEmail();

            ServiceMessage serviceMessage = await accountService.ChangePasswordAsync(changePasswordDTO);

            return GenerateResponse(serviceMessage);
        }

        [HttpPost]
        [Route("checkemail")]
        [AllowAnonymous]
        public async Task<IActionResult> CheckEmail([FromQuery] string email)
        {
            ServiceMessage serviceMessage = await accountService.IsUnique(email);

            return GenerateResponse(serviceMessage);
        }
    }
}
