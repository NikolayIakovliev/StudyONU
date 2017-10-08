using Microsoft.AspNetCore.Mvc;

namespace StudyONU.Admin.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() => Content("Hello");
    }
}
