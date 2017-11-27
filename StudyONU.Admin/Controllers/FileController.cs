using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MimeMapping;
using StudyONU.Admin.Models.File;
using StudyONU.Logic.Contracts;
using System;
using System.IO;

namespace StudyONU.Admin.Controllers
{
    public class FileController : Controller
    {
        private readonly IHostingEnvironment env;
        private readonly ILogger logger;

        public FileController(IHostingEnvironment env, ILogger logger)
        {
            this.env = env;
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
    }
}
