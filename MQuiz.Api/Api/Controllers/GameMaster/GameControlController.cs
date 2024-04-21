using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.GameMaster
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(Roles = "GameMaster")]
    public class GameControlController : ControllerBase
    {
        [HttpGet("gameInfo/{id}")]
        public ActionResult<string> GetGameInfo([FromRoute] string id)
        {
            return Ok("test");
        }
    }
}
