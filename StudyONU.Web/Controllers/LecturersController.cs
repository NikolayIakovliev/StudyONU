using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudyONU.Logic.Contracts.Services;
using StudyONU.Logic.DTO.LecturerQueue;
using StudyONU.Logic.Infrastructure;
using StudyONU.Web.Helpers;
using StudyONU.Web.Models.LecturerQueue;
using System.Threading.Tasks;

namespace StudyONU.Web.Controllers
{
    public class LecturersController : ApiController
    {
        private readonly ILecturerQueueService service;
        private readonly IMapper mapper;
        private readonly ProxyHelper proxyHelper;

       public LecturersController(
            ILecturerQueueService service,
            IMapper mapper,
            ProxyHelper proxyHelper
            )
        {
            this.service = service;
            this.mapper = mapper;
            this.proxyHelper = proxyHelper;
        }

        [HttpPost]
        public async Task<IActionResult> Register(LecturerQueueBindingModel model)
        {
            string path = await proxyHelper.SendLecturerFileAsync(model.Photo);

            if (path != null)
            {
                LecturerQueueCreateDTO lecturerQueueCreateDTO = mapper.Map<LecturerQueueCreateDTO>(model);
                lecturerQueueCreateDTO.PhotoPath = path;

                ServiceMessage serviceMessage = await service.CreateAsync(lecturerQueueCreateDTO);
                
                return GenerateResponse(serviceMessage);
            }

            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
