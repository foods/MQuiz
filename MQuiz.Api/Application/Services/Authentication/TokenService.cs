using Application.Configuration.Options;
using Application.Interfaces.Authentication;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Application.Entities.Domain.User;

namespace Application.Services.Authentication;

public class TokenService : ITokenService
{
    private readonly AuthenticationOptions _authenticationOptions;

    public TokenService(IOptions<AuthenticationOptions> authenticationOptions)
    {
        _authenticationOptions = authenticationOptions.Value;
    }

    public string CreateToken(User user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationOptions.Jwt.Key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Role, user.Role.ToString()),
        };

        var sectoken = new JwtSecurityToken(_authenticationOptions.Jwt.Issuer,
          _authenticationOptions.Jwt.Issuer,
          claims,
          expires: DateTime.Now.AddMinutes(_authenticationOptions.Jwt.ValidityInMinutes),
          signingCredentials: credentials);

        var token = new JwtSecurityTokenHandler().WriteToken(sectoken);

        return token;
    }
}
