using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Options;
using System;
using System.IO;
using StudyONU.Logic.Infrastructure;

namespace StudyONU.Logic.Helpers
{
    public class FileLogger : ILogger
    {
        private readonly LoggingOptions options;
        private readonly IHostingEnvironment env;

        public FileLogger(IHostingEnvironment env, IOptions<LoggingOptions> options)
        {
            this.options = options.Value;
            this.env = env;
        }

        public void Fatal(Exception exception)
        {
            string fullPath = GetFullPath(options.ErrorFileName);

            using (StreamWriter stream = File.AppendText(fullPath))
            {
                string now = DateTime.Now.ToLongDateString();
                stream.WriteLine($"[{now}] (FATAL): Exception:");
                do
                {
                    stream.WriteLine($"  -{exception.Message}");
                    exception = exception.InnerException;
                } while (exception != null);
            }
        }

        public void Fatal(string message)
        {
            string fullPath = GetFullPath(options.ErrorFileName);

            using (StreamWriter stream = File.AppendText(fullPath))
            {
                string now = DateTime.Now.ToLongDateString();
                stream.WriteLine($"[{now}] (FATAL): {message}.");
            }
        }

        public void Log(string message)
        {
            string fullPath = GetFullPath(options.InfoFileName);

            using (StreamWriter stream = File.AppendText(fullPath))
            {
                string now = DateTime.Now.ToLongDateString();
                stream.WriteLine($"[{now}] (Info): {message}.");
            }
        }

        private string GetFullPath(string fileName)
        {
            string root = env.ContentRootPath;
            string fullPath = Path.Combine(root, fileName);

            return fullPath;
        }
    }
}
