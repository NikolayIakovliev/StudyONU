using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using StudyONU.Logic.Contracts;
using StudyONU.Web.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace StudyONU.Web.Helpers
{
    public class ProxyHelper
    {
        private const string StudentApi = "api/files/student";
        private const string ReportsApi = "api/files/reports";

        private readonly ILogger logger;
        private readonly DomainOptions options;

        public ProxyHelper(
            ILogger logger,
            IOptions<DomainOptions> options
            )
        {
            this.logger = logger;
            this.options = options.Value;
        }

        /// <summary>
        /// Sends an IFormFile to the CMS server where the file should be saved
        /// </summary>
        /// <param name="file"></param>
        /// <returns>Returns path of saved file. If operation was unsuccessful returns null</returns>
        public async Task<string> SendFileAsync(IFormFile file)
        {
            string path = null;
            
            try
            {
                using (HttpClient client = CreateHttpClient())
                {
                    MultipartFormDataContent content = GetContent(file);

                    HttpResponseMessage response = await client.PostAsync(StudentApi, content);
                    if (response.IsSuccessStatusCode)
                    {
                        path = await response.Content.ReadAsStringAsync();
                    }
                }
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
            }

            return path;
        }

        /// <summary>
        /// Sends IEnumerable<IFormFile> to the CMS server where the files should be saved
        /// </summary>
        /// <param name="files"></param>
        /// <returns>Returns paths of saved files. If operation was unsuccessful returns null</returns>
        public async Task<IEnumerable<string>> SendFilesAsync(IEnumerable<IFormFile> files)
        {
            IEnumerable<string> paths = null;

            try
            {
                using (HttpClient client = CreateHttpClient())
                {
                    MultipartFormDataContent content = GetContent(files);

                    HttpResponseMessage response = await client.PostAsync(ReportsApi, content);
                    if (response.IsSuccessStatusCode)
                    {
                        string pathsFormatted = await response.Content.ReadAsStringAsync();
                        paths = pathsFormatted.Split(';');
                    }
                }
            }
            catch (Exception exception)
            {
                logger.Fatal(exception);
            }

            return paths;
        }

        private HttpClient CreateHttpClient()
        {
            HttpClient client = new HttpClient
            {
                BaseAddress = new Uri(options.Url)
            };

            return client;
        }

        private MultipartFormDataContent GetContent(IEnumerable<IFormFile> files)
        {
            MultipartFormDataContent content = new MultipartFormDataContent();

            foreach (IFormFile file in files)
            {
                ByteArrayContent bytes = GetByteArray(file);

                content.Add(bytes, "file", file.FileName);
            }

            return content;
        }

        private MultipartFormDataContent GetContent(IFormFile file)
        {
            ByteArrayContent bytes = GetByteArray(file);

            MultipartFormDataContent content = new MultipartFormDataContent
            {
                { bytes, "file", file.FileName }
            };

            return content;
        }

        private ByteArrayContent GetByteArray(IFormFile file)
        {
            byte[] data;

            using (BinaryReader reader = new BinaryReader(file.OpenReadStream()))
            {
                data = reader.ReadBytes((int)file.OpenReadStream().Length);
            }

            return new ByteArrayContent(data);
        }
    }
}
