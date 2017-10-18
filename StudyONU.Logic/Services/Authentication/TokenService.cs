using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services.Authentication;
using StudyONU.Logic.DTO.Account;
using StudyONU.Logic.DTO.Authorization;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace StudyONU.Logic.Services.Authentication
{
    public class TokenService : ServiceBase, ITokenService
    {
        private readonly IPasswordHasher passwordHasher;

        public TokenService(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IExceptionMessageBuilder exceptionMessageBuilder,
            IPasswordHasher passwordHasher
            )
            : base(unitOfWork, mapper, exceptionMessageBuilder)
        {
            this.passwordHasher = passwordHasher;
        }

        public async Task<DataServiceMessage<TokenDTO>> GenerateTokenAsync(LoginDTO loginDTO)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();
            TokenDTO data = null;

            try
            {
                bool authorized = false;

                UserEntity userEntity = await unitOfWork.Users.GetByEmailAsync(loginDTO.Email);
                if (userEntity != null)
                {
                    authorized = passwordHasher.VerifyHashedPassword(userEntity.PasswordHash, loginDTO.Password);
                    if (authorized)
                    {
                        Claim[] claims = new[]
                        {
                            new Claim(ClaimTypes.Role, userEntity.Role.Name),
                            new Claim(JwtRegisteredClaimNames.Email, loginDTO.Email),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        };

                        SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(loginDTO.Key));
                        SigningCredentials credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

                        JwtSecurityToken token = new JwtSecurityToken(
                            loginDTO.Issuer,
                            loginDTO.Issuer,
                            claims,
                            expires: DateTime.Now.AddMinutes(30),
                            signingCredentials: credentials
                            );

                        JwtSecurityTokenHandler jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
                        data = new TokenDTO
                        {
                            Token = jwtSecurityTokenHandler.WriteToken(token),
                            UserRole = userEntity.Role.Name
                        };
                    }
                }

                if (!authorized)
                {
                    actionResult = ServiceActionResult.Error;
                    errors.Add("Invalid email or password");
                }
            }
            catch (Exception exception)
            {
                exceptionMessageBuilder.FillErrors(exception, errors);
                actionResult = ServiceActionResult.Exception;
            }

            return new DataServiceMessage<TokenDTO>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }
    }
}
