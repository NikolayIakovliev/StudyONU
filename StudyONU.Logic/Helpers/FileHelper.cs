using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace StudyONU.Logic.Helpers
{
    public class FileHelper : IFileHelper
    {
        private readonly IHostingEnvironment env;
        private readonly IExceptionMessageBuilder exceptionMessageBuilder;

        public FileHelper(IHostingEnvironment env, IExceptionMessageBuilder exceptionMessageBuilder)
        {
            this.env = env;
            this.exceptionMessageBuilder = exceptionMessageBuilder;
        }

        public async Task<DataServiceMessage<string>> SaveFileAsync(IFormFile file, string serverFolderPath)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();
            string data = null;

            try
            {
                string fileName = Guid.NewGuid().ToString();
                string extension = Path.GetExtension(file.FileName);
                string fullFileName = $"{fileName}{extension}";

                string path = Path.Combine(env.WebRootPath, serverFolderPath, fullFileName);
                using (Stream stream = new FileStream(path, FileMode.Create, FileAccess.Write))
                {
                    await file.CopyToAsync(stream);
                }

                data = "/" + Path.Combine(serverFolderPath, fullFileName);
            }
            catch (Exception exception)
            {
                actionResult = ServiceActionResult.Exception;
                exceptionMessageBuilder.FillErrors(exception, errors);
            }

            return new DataServiceMessage<string>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }
    }
}
