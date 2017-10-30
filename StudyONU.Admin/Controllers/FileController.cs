using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Guide;
using StudyONU.Logic.Infrastructure;
using System.IO;
using System.Threading.Tasks;

namespace StudyONU.Admin.Controllers
{
    public class FileController : Controller
    {
        private readonly IGuideService service;
        private readonly IHostingEnvironment env;

        public FileController(IGuideService service, IHostingEnvironment env)
        {
            this.service = service;
            this.env = env;
        }

        public async Task<IActionResult> DownloadGuide(int id)
        {
            DataServiceMessage<GuideDetailsDTO> serviceMessage = await service.GetByIdAsync(id);
            if (serviceMessage.ActionResult == ServiceActionResult.Success)
            {
                GuideDetailsDTO guide = serviceMessage.Data;

                string virtualPath = Path.Combine(env.WebRootPath, guide.FilePath);
                string extension = Path.GetExtension(guide.FilePath);
                string fileName = $"{guide.Name}{extension}";

                return File(virtualPath, "application/force-download", fileName);
            }
            else if (serviceMessage.ActionResult == ServiceActionResult.Exception)
            {
                // TODO
                // implement logging
            }

            return NotFound();
        }
    }
}
