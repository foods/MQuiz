using Application.Entities.Dto.Request;
using Application.Interfaces.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Player;

[Route("[controller]")]
[ApiController]
[Authorize(Roles = "Player")]
public class GameController : ControllerBase
{
    private readonly ILogger<GameController> _logger;
    private readonly ITokenService _tokenService;

    public GameController(ILogger<GameController> logger, ITokenService tokenService)
    {
        _logger = logger;
        _tokenService = tokenService;
    }

    [HttpGet("gameInfo/{id}")]
    public ActionResult<string> GetGameInfo([FromRoute] string id)
    {
        return Ok("test");
    }

}
