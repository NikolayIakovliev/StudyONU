using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using StudyONU.Logic.Options;
using System;
using System.Text;

namespace StudyONU.Logic.Extensions
{
    public static class AuthenticationServiceCollectionExtensions
    {
        public static AuthenticationBuilder AddAuthentication(this IServiceCollection services)
        {
            IServiceProvider serviceProvider = services.BuildServiceProvider();
            IOptions<AuthOptions> options = serviceProvider.GetRequiredService<IOptions<AuthOptions>>();
            AuthOptions authOptions = options.Value;

            return services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(config =>
                {
                    config.RequireHttpsMetadata = false;
                    config.SaveToken = true;

                    config.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidIssuer = authOptions.Issuer,
                        ValidAudience = authOptions.Issuer,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authOptions.Key))
                    };
                });
        }
    }
}
