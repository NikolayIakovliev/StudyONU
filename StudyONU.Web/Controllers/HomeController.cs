using Microsoft.AspNetCore.Mvc;

namespace StudyONU.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() => View();
    }
}
