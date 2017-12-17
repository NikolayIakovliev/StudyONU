using AutoMapper;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using StudyONU.Core.Entities;
using StudyONU.Data.Contracts;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services.Authentication;
using StudyONU.Logic.DTO.Account;
using StudyONU.Logic.DTO.Authorization;
using StudyONU.Logic.Infrastructure;
using StudyONU.Logic.Options;
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
        private readonly AuthOptions options;

        public TokenService(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ILogger logger,
            IPasswordHasher passwordHasher,
            IOptions<AuthOptions> options
            )
            : base(unitOfWork, mapper, logger)
        {
            this.passwordHasher = passwordHasher;
            this.options = options.Value;
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
                        UserEntity developerEntity = await unitOfWork.Users.GetByEmailAndRoleAsync(loginDTO.Email, Roles.Developer);
                        UserEntity adminEntity = await unitOfWork.Users.GetByEmailAndRoleAsync(loginDTO.Email, Roles.Admin);
                        UserEntity lecturerEntity = await unitOfWork.Users.GetByEmailAndRoleAsync(loginDTO.Email, Roles.Lecturer);

                        userEntity = developerEntity ?? adminEntity ?? lecturerEntity;
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

                        SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(options.Key));
                        SigningCredentials credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

                        JwtSecurityToken token = new JwtSecurityToken(
                            options.Issuer,
                            options.Issuer,
                            claims,
                            expires: DateTime.Now.AddMinutes(TokenMinutesExpiration),
                            signingCredentials: credentials
                            );

                        JwtSecurityTokenHandler jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
                        data = new UserInfoDTO
                        {
                            Token = jwtSecurityTokenHandler.WriteToken(token),
                            Email = userEntity.Email,
                            Role = userEntity.Role.Name,
                            DisplayRole = userEntity.Role.DisplayName,
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
