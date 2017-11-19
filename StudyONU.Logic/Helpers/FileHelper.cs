using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Infrastructure;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace StudyONU.Logic.Helpers
{
    public class FileHelper : IFileHelper
    {
        private readonly IHostingEnvironment env;
        private readonly ILogger logger;

        public FileHelper(IHostingEnvironment env, ILogger logger)
        {
            this.env = env;
            this.logger = logger;
        }

        public async Task<DataServiceMessage<string>> SaveFileAsync(IFormFile file, string serverFolderPath)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();
            string data = null;

            if (file != null)
            {
                try
                {
                    data = await CreateFile(file, serverFolderPath);
                }
                catch (Exception exception)
                {
                    actionResult = ServiceActionResult.Exception;
                    logger.Fatal(exception);
                }
            }
            else
            {
                actionResult = ServiceActionResult.Error;
                errors.AddCommonError("File wasn't received");
            }

            return new DataServiceMessage<string>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }

        public async Task<DataServiceMessage<IEnumerable<string>>> SaveFilesAsync(IEnumerable<IFormFile> files, string serverFolderPath)
        {
            ServiceActionResult actionResult = ServiceActionResult.Success;
            ErrorCollection errors = new ErrorCollection();
            IEnumerable<string> data = null;

            if (files != null)
            {
                try
                {
                    IEnumerable<Task<string>> tasks = files.Select(async file => await CreateFile(file, serverFolderPath));
                    await Task.WhenAll(tasks);
                    data = tasks.Select(task => task.Result);
                }
                catch (Exception exception)
                {
                    actionResult = ServiceActionResult.Exception;
                    logger.Fatal(exception);
                }
            }
            else
            {
                actionResult = ServiceActionResult.Error;
                errors.AddCommonError("Files weren't received");
            }

            return new DataServiceMessage<IEnumerable<string>>
            {
                ActionResult = actionResult,
                Errors = errors,
                Data = data
            };
        }

        private async Task<string> CreateFile(IFormFile file, string serverFolderPath)
        {
            string fileName = Guid.NewGuid().ToString();
            string extension = Path.GetExtension(file.FileName);
            string fullFileName = $"{fileName}{extension}";

            string path = Path.Combine(env.WebRootPath, serverFolderPath, fullFileName);
            using (Stream stream = new FileStream(path, FileMode.Create, FileAccess.Write))
            {
                await file.CopyToAsync(stream);
            }

            return "/" + Path.Combine(serverFolderPath, fullFileName);
        }
    }
}
