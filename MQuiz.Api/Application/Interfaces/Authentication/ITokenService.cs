using Application.Entities.Domain.User;
using System.IdentityModel.Tokens.Jwt;

namespace Application.Interfaces.Authentication;

public interface ITokenService
{
    string CreateToken(User user);
}
