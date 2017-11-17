using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.Course;
using StudyONU.Logic.DTO.Guide;
using StudyONU.Logic.Infrastructure;
using System.IO;
using System.Threading.Tasks;

namespace StudyONU.Admin.Controllers
{
    public class FileController : Controller
    {
        private const string TasksUploadPath = "files/uploads/tasks";

        private readonly IGuideService guideService;
        private readonly ICourseService courseService;
        private readonly IHostingEnvironment env;

        public FileController(
            IGuideService guideService,
            ICourseService courseService,
            IHostingEnvironment env
            )
        {
            this.guideService = guideService;
            this.courseService = courseService;
            this.env = env;
        }

        public async Task<IActionResult> DownloadGuide(int id)
        {
            DataServiceMessage<GuideDetailsDTO> serviceMessage = await guideService.GetByIdAsync(id);
            if (serviceMessage.ActionResult == ServiceActionResult.Success)
            {
                GuideDetailsDTO guide = serviceMessage.Data;

                string virtualPath = Path.Combine(env.WebRootPath, guide.FilePath);
                string extension = Path.GetExtension(guide.FilePath);
                string fileName = $"{guide.Name}{extension}";

                return File(virtualPath, "application/force-download", fileName);
            }

            return NotFound();
        }

        public async Task<IActionResult> DownloadTask(int courseId, string taskName)
        {
            DataServiceMessage<CourseDetailsDTO> serviceMessage = await courseService.GetAsync(courseId);
            if (serviceMessage.ActionResult == ServiceActionResult.Success)
            {
                CourseDetailsDTO course = serviceMessage.Data;

                string fullPath = Path.Combine(env.WebRootPath, TasksUploadPath, taskName);
                if (System.IO.File.Exists(fullPath))
                {
                    string extension = Path.GetExtension(taskName);
                    string fileName = $"{course.Name}{extension}";

                    return File(fullPath, "application/force-download", fileName);
                }
            }

            return NotFound();
        }
    }
}
