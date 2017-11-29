using StudyONU.Core.Entities;
using StudyONU.Logic.DTO.Lecturer;

namespace StudyONU.Logic.Mappings
{
    class LecturerProfile : ProfileBase
    {
        public LecturerProfile()
        {
            CreateMap<LecturerEntity, LecturerListDTO>()
                .ForMember(dest => dest.FirstName, opts => opts.MapFrom(src => src.User.FirstName))
                .ForMember(dest => dest.LastName, opts => opts.MapFrom(src => src.User.LastName))
                .ForMember(dest => dest.Patronymic, opts => opts.MapFrom(src => src.User.Patronymic))
                .ForMember(dest => dest.Email, opts => opts.MapFrom(src => src.User.Email))
                .ForMember(dest => dest.PhotoPath, opts => opts.MapFrom(src => src.User.PhotoPath));
            CreateMap<LecturerCreateDTO, UserEntity>();
        }
    }
}
