using Application.Configuration.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Api.Configuration.ServiceExtensions;

public static class AuthenticationExtension
{
    public static void AddAuthenticationConfiguration(this IServiceCollection services, ConfigurationManager configuration)
    {
        services.Configure<AuthenticationOptions>(configuration.GetSection("Authentication"));
        var authOptions = configuration.GetSection("Authentication").Get<AuthenticationOptions>();
        services.AddAuthentication("Bearer").AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = authOptions.Jwt.Issuer,
                ValidAudience = authOptions.Jwt.Issuer,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authOptions.Jwt.Key))
            };
        });
    }
}
