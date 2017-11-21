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
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace StudyONU.Logic.Services.Authentication
{
    public class TokenService : ServiceBase, ITokenService
    {
        private const int TokenMinutesExpiration = 120;

        private readonly IPasswordHasher passwordHasher;

        public TokenService(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ILogger logger,
            IPasswordHasher passwordHasher
            )
            : base(unitOfWork, mapper, logger)
        {
            this.passwordHasher = passwordHasher;
        }

        public async Task<DataServiceMessage<UserInfoDTO>> GenerateTokenAsync(LoginDTO loginDTO, LoginSettings settings)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();
            UserInfoDTO data = null;

            try
            {
                bool authorized = false;

                UserEntity userEntity = null;
                switch (settings)
                {
                    case LoginSettings.Administration:
                        AdminEntity adminEntity = await unitOfWork.Admins.GetByEmailAsync(loginDTO.Email);
                        LecturerEntity lecturerEntity = await unitOfWork.Lecturers.GetByEmailAsync(loginDTO.Email);

                        userEntity = adminEntity?.User ?? lecturerEntity?.User;
                        break;
                    case LoginSettings.Student:
                        StudentEntity studentEntity = await unitOfWork.Students.GetByEmailAsync(loginDTO.Email);

                        userEntity = studentEntity?.User;
                        break;
                    default:
                        break;
                }

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
                            expires: DateTime.Now.AddMinutes(TokenMinutesExpiration),
                            signingCredentials: credentials
                            );

                        JwtSecurityTokenHandler jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
                        data = new UserInfoDTO
                        {
                            Token = jwtSecurityTokenHandler.WriteToken(token),
                            Role = userEntity.Role.Name,
                            FirstName = userEntity.FirstName,
                            LastName = userEntity.LastName,
                            Patronymic = userEntity.Patronymic,
                            PhotoPath = userEntity.PhotoPath
                        };
                    }
                }

                if (!authorized)
                {
                    actionResult = ServiceActionResult.Error;
                    errors.AddCommonError("Invalid email or password");
                }
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
                actionResult = ServiceActionResult.Exception;
                errors.AddExceptionError();
            }

            return new DataServiceMessage<UserInfoDTO>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }
    }
}
