using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MimeMapping;
using StudyONU.Admin.Models.File;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace StudyONU.Admin.Controllers
{
    public class FileController : Controller
    {
        private const string StudentsImageUploadPath = "\\images\\uploads\\students";
        private const string ReportsUploadPath = "\\files\\uploads\\reports";

        private readonly IHostingEnvironment env;
        private readonly IFileHelper fileHelper;
        private readonly ILogger logger;

        public FileController(
            IHostingEnvironment env,
            IFileHelper fileHelper,
            ILogger logger
            )
        {
            this.env = env;
            this.fileHelper = fileHelper;
            this.logger = logger;
        }

        [HttpPost]
        public IActionResult Download([FromBody] FileBindingModel model)
        {
            try
            {
                string absolutePath = Path.Combine(env.WebRootPath, model.FilePath);

                if (System.IO.File.Exists(absolutePath))
                {
                    string extension = Path.GetExtension(model.FilePath);
                    string contentType = MimeUtility.GetMimeMapping(extension);

                    return File(model.FilePath, contentType, $"{model.DownloadName}{extension}");
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("/api/files/student")]
        public async Task<IActionResult> SavePhoto()
        {
            if (Request.HasFormContentType)
            {
                IFormCollection form = Request.Form;
                IFormFile file = form.Files.FirstOrDefault();
                DataServiceMessage<string> serviceMessage = await fileHelper.SaveFileAsync(file, StudentsImageUploadPath);

                if (serviceMessage.ActionResult == ServiceActionResult.Success)
                {
                    return Ok(serviceMessage.Data);
                }
                else
                {
                    return BadRequest("File upload failed");
                }
            }

            return BadRequest("No file uploaded");
        }

        [HttpPost]
        [Route("/api/files/reports")]
        public async Task<IActionResult> SaveReports()
        {
            if (Request.HasFormContentType)
            {
                IFormCollection form = Request.Form;
                IEnumerable<IFormFile> files = form.Files;
                DataServiceMessage<IEnumerable<string>> serviceMessage = await fileHelper.SaveFilesAsync(files, ReportsUploadPath);

                if (serviceMessage.ActionResult == ServiceActionResult.Success)
                {
                    return Ok(String.Join(";", serviceMessage.Data));
                }
                else
                {
                    return BadRequest("Files upload failed");
                }
            }

            return BadRequest("No file uploaded");
        }
    }
}
