using StudyONU.Logic.Infrastructure;
using System.Threading.Tasks;

namespace StudyONU.Logic.Contracts
{
    public interface IImageHelper
    {
        Task<DataServiceMessage<string>> SaveByBase64Async(string base64String, string serverFolderPath);
    }
}
