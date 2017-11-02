using AutoMapper;
using StudyONU.Core.Entities;
using StudyONU.Logic.DTO.StudentQueue;

namespace StudyONU.Logic.Mappings
{
    class StudentQueueProfile : Profile
    {
        public StudentQueueProfile()
        {
            CreateMap<StudentQueueCreateDTO, StudentQueueEntity>();
            CreateMap<StudentQueueEntity, UserEntity>();
            CreateMap<StudentQueueEntity, StudentQueueListDTO>()
                .ForMember(dest => dest.SpecialityName, opts => opts.MapFrom(src => src.Speciality.Name));
        }
    }
}
