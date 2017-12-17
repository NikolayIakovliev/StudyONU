using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Infrastructure;
using System.Security.Claims;

namespace StudyONU.Admin.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ApiController : Controller
    {
        protected const string LecturersImageUploadPath = "images\\uploads\\lecturers";
        protected const string GuidesUploadPath = "files\\uploads\\guides";
        protected const string TasksUploadPath = "files\\uploads\\tasks";
        
        protected string GetUserEmail()
        {
            return User.FindFirstValue(ClaimTypes.Email);
        }

        protected IActionResult GenerateResponse<TData>(DataServiceMessage<TData> serviceMessage) where TData : class
        {
            var response = new
            {
                success = serviceMessage.ActionResult == ServiceActionResult.Success,
                errors = serviceMessage.Errors,
                data = serviceMessage.Data
            };

            return GenerateResponse(response, serviceMessage.ActionResult);
        }

        protected IActionResult GenerateResponse(ServiceMessage serviceMessage)
        {
            var response = new
            {
                success = serviceMessage.ActionResult == ServiceActionResult.Success,
                errors = serviceMessage.Errors
            };

            return GenerateResponse(response, serviceMessage.ActionResult);
        }

        protected IActionResult GenerateResponse(object obj, ServiceActionResult result)
        {
            IActionResult actionResult = null;

            switch (result)
            {
                case ServiceActionResult.Success:
                    actionResult = Ok(obj);
                    break;
                case ServiceActionResult.Error:
                    actionResult = BadRequest(obj);
                    break;
                case ServiceActionResult.Exception:
                    actionResult = BadRequest(obj);
                    break;
                case ServiceActionResult.NotFound:
                    actionResult = BadRequest(obj);
                    break;
            }

            return actionResult;
        }
    }
}
