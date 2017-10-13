using AutoMapper;
using StudyONU.Core.Entities;
using StudyONU.Logic.DTO.Lecturer;

namespace StudyONU.Logic.Mappings
{
    public class LecturerProfile : Profile
    {
        public LecturerProfile()
        {
            CreateMap<LecturerEntity, LecturerListDTO>()
                .ForMember(dest => dest.FullName, opts => opts.MapFrom(src => $"{src.User.LastName} {src.User.FirstName} {src.User.Patronymic}"))
                .ForMember(dest => dest.Email, opts => opts.MapFrom(src => src.User.Email))
                .ForMember(dest => dest.PhotoPath, opts => opts.MapFrom(src => src.User.PhotoPath));
        }
    }
}
