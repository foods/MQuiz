using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
public class AuthorizationController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;

    public AuthorizationController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public IActionResult CreateGame()
    {

    }
}
