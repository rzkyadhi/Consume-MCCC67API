using Microsoft.AspNetCore.Mvc;

namespace ConsumeMCC67API.Controllers
{
    public class StarWarsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
