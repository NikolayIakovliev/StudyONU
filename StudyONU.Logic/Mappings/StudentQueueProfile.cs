using StudyONU.Core.Entities;
using StudyONU.Logic.DTO.StudentQueue;

namespace StudyONU.Logic.Mappings
{
    class StudentQueueProfile : ProfileBase
    {
        public StudentQueueProfile()
        {
            CreateMap<StudentQueueCreateDTO, StudentQueueEntity>();
            CreateMap<StudentQueueEntity, UserEntity>()
                .ForMember(dest => dest.Id, opts => opts.Ignore());
            CreateMap<StudentQueueEntity, StudentQueueListDTO>()
                .ForMember(dest => dest.SpecialityName, opts => opts.MapFrom(src => src.Speciality.Name));
        }
    }
}
