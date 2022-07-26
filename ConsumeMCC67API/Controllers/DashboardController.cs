using Microsoft.AspNetCore.Mvc;

namespace ConsumeMCC67API.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
