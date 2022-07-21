using Microsoft.AspNetCore.Mvc;

namespace ConsumeMCC67API.Controllers
{
    public class PokemonController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
