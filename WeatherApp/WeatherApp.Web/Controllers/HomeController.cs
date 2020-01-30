using Microsoft.AspNetCore.Mvc;

namespace WeatherApp.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() => View();
    }
}
