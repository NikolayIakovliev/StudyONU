using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Infrastructure;

namespace StudyONU.Admin.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ApiController : Controller
    {
        protected IActionResult GenerateResponse<TData>(DataServiceMessage<TData> serviceMessage) where TData : class
        {
            var response = new
            {
                success = serviceMessage.ActionResult == ServiceActionResult.Success,
                errors = serviceMessage.Errors,
                data = serviceMessage.Data
            };

            IActionResult actionResult = null;
            switch (serviceMessage.ActionResult)
            {
                case ServiceActionResult.Success:
                    actionResult = Ok(response);
                    break;
                case ServiceActionResult.Error:
                    actionResult = Ok(response);
                    break;
                case ServiceActionResult.Exception:
                    actionResult = Ok(response);
                    break;
                case ServiceActionResult.NotFound:
                    actionResult = BadRequest(response);
                    break;
            }

            return actionResult;
        }

        protected IActionResult GenerateResponse(ServiceMessage serviceMessage)
        {
            var response = new
            {
                success = serviceMessage.ActionResult == ServiceActionResult.Success,
                errors = serviceMessage.Errors
            };

            IActionResult actionResult = null;
            switch (serviceMessage.ActionResult)
            {
                case ServiceActionResult.Success:
                    actionResult = Ok(response);
                    break;
                case ServiceActionResult.Error:
                    actionResult = Ok(response);
                    break;
                case ServiceActionResult.Exception:
                    actionResult = Ok(response);
                    break;
                case ServiceActionResult.NotFound:
                    actionResult = BadRequest(response);
                    break;
            }

            return actionResult;
        }
    }
}
