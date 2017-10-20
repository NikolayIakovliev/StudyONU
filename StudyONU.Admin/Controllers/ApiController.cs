﻿using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Infrastructure;
using System.Security.Claims;

namespace StudyONU.Admin.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ApiController : Controller
    {
        protected const string LecturersImageUploadPath = "images/uploads/lecturers";
        protected const string StudentsImageUploadPath = "images/uploads/students";
        protected const string QueueImageUploadPath = "images/uploads/queue";
        protected const string GuidesUploadPath = "files/uploads/guides";
        protected const string TasksUploadPath = "files/uploads/tasks";

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

        protected string GetUserEmail()
        {
            return User.FindFirstValue(ClaimTypes.Email);
        }
    }
}
