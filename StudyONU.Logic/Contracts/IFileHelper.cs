using Microsoft.AspNetCore.Http;
using StudyONU.Logic.Infrastructure;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace StudyONU.Logic.Contracts
{
    public interface IFileHelper
    {
        Task<DataServiceMessage<string>> SaveFileAsync(IFormFile file, string serverFolderPath);

        Task<DataServiceMessage<IEnumerable<string>>> SaveFilesAsync(IEnumerable<IFormFile> files, string serverFolderPath);
    }
}
