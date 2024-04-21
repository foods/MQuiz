using Application.Entities.Domain.Enums;
using Application.Entities.Domain.User;
using Application.Entities.Dto.Request;
using Application.Interfaces.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthorizationController : ControllerBase
{
    private readonly ILogger<AuthorizationController> _logger;
    private readonly ITokenService _tokenService;

    public AuthorizationController(ILogger<AuthorizationController> logger, ITokenService tokenService)
    {
        _logger = logger;
        _tokenService = tokenService;
    }

    [HttpPost("CreateGame")]
    public ActionResult<string> CreateGame()
    {
        var gameId = Guid.NewGuid();
        // TODO: Actually create game
        var token = _tokenService.CreateToken(new User
        {
            Id = gameId,
            Name = "GameMaster",
            Role = UserRole.GameMaster,
        });

        _logger.LogInformation("Created new game with id: {id}", gameId);

        return Ok(token);
    }


    [HttpPost("JoinGame")]
    public ActionResult<string> JoinGame([FromBody] JoinGameRequest request)
    {
        // TODO: Verify game etc
        var userId = Guid.NewGuid();
        var token = _tokenService.CreateToken(new User
        {
            Id = userId,
            Name = request.Name,
            Role = UserRole.Player,
        });

        _logger.LogInformation("Player {name} joined game {gameId}", request.Name, request.GameId);

        return Ok(token);
    }

}
