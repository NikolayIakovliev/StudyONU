using Microsoft.AspNetCore.Hosting;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace StudyONU.Logic.Helpers
{
    public class FileHelper : IFileHelper
    {
        private const string Jpeg = "jpeg";
        private const string Jpg = "jpg";
        private const string Png = "png";

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

        public async Task<DataServiceMessage<string>> SaveByBase64Async(string base64String, string serverFolderPath)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            List<string> errors = new List<string>();
            string data = null;

            try
            {
                (string base64, string extension) = ParseString(base64String);
                byte[] bytes = Convert.FromBase64String(base64);
                string guid = Guid.NewGuid().ToString();
                string fileName = $"{guid}.{extension}";

                string uploadPath = Path.Combine(env.WebRootPath, serverFolderPath);
                string fullPath = Path.Combine(uploadPath, fileName);
                string fileServerPath = Path.Combine(serverFolderPath, fileName);

                using (Stream stream = new FileStream(fullPath, FileMode.Create, FileAccess.Write))
                {
                    await stream.WriteAsync(bytes, 0, bytes.Length);
                }

                data = fileServerPath;
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

        private (string base64, string extension) ParseString(string imageBase64)
        {
            string base64 = "";
            string extension = "";

            if (imageBase64.Contains($"image/{Jpeg}"))
            {
                base64 = imageBase64.Replace($"data:image/{Jpeg};base64,", String.Empty);
                extension = Jpeg;
            }
            else if (imageBase64.Contains($"image/{Jpg}"))
            {
                base64 = imageBase64.Replace($"data:image/{Jpg};base64,", String.Empty);
                extension = Jpg;
            }
            else if (imageBase64.Contains($"image/{Png}"))
            {
                base64 = imageBase64.Replace($"data:image/{Png};base64,", String.Empty);
                extension = Png;
            }
            else
            {
                base64 = imageBase64;
                extension = Jpeg;
            }

            return (base64, extension);
        }
    }
}
