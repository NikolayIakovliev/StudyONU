using Microsoft.AspNetCore.Http;
using StudyONU.Logic.Infrastructure;
using System.Threading.Tasks;

namespace StudyONU.Logic.Contracts
{
    public interface IFileHelper
    {
        Task<DataServiceMessage<string>> SaveFileAsync(IFormFile file, string serverFolderPath);

        Task<DataServiceMessage<string>> SaveByBase64Async(string base64String, string serverFolderPath);
    }
}
