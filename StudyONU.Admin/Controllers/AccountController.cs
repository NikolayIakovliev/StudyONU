using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Admin.Models;
using StudyONU.Logic.Contracts.Services.Authentication;
using StudyONU.Logic.DTO.Account;
using StudyONU.Logic.DTO.Authorization;
using StudyONU.Logic.Infrastructure;
using System.Threading.Tasks;

namespace StudyONU.Admin.Controllers
{
    [AllowAnonymous]
    public class AccountController : ApiController
    {
        private readonly ITokenService service;
        private readonly IMapper mapper;

        public AccountController(ITokenService service, IMapper mapper)
        {
            this.service = service;
            this.mapper = mapper;
        }

        [HttpPost]
        [Route("/api/token")]
        public async Task<IActionResult> GenerateToken([FromBody] LoginBindingModel model)
        {
            LoginDTO loginDTO = mapper.Map<LoginDTO>(model);
            DataServiceMessage<UserInfoDTO> serviceMessage = await service.GenerateTokenAsync(loginDTO);

            return GenerateResponse(serviceMessage);
        }
    }
}
