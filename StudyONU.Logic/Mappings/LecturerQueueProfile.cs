using StudyONU.Core.Entities;
using StudyONU.Logic.DTO.LecturerQueue;

namespace StudyONU.Logic.Mappings
{
    class LecturerQueueProfile : ProfileBase
    {
        public LecturerQueueProfile()
        {
            CreateMap<LecturerQueueCreateDTO, LecturerQueueEntity>();
            CreateMap<LecturerQueueEntity, LecturerQueueListDTO>();
            CreateMap<LecturerQueueEntity, UserEntity>()
                .ForMember(dest => dest.Id, opts => opts.Ignore());
        }
    }
}
