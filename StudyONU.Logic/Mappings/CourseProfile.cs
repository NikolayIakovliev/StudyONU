using StudyONU.Core.Entities;
using StudyONU.Logic.DTO.Course;

namespace StudyONU.Logic.Mappings
{
    class CourseProfile : ProfileBase
    {
        public CourseProfile()
        {
            CreateMap<CourseCreateDTO, CourseEntity>();
            CreateMap<CourseEntity, CourseListDTO>()
                .ForMember(dest => dest.SpecialityName, opts => opts.MapFrom(src => src.Speciality.Name))
                .ForMember(dest => dest.LecturerFullName, opts => opts.MapFrom(src => GetFullName(src.Lecturer.User)))
                .ForMember(dest => dest.LecturerEmail, opts => opts.MapFrom(src => src.Lecturer.User.Email))
                .ForMember(dest => dest.LecturerPhotoPath, opts => opts.MapFrom(src => src.Lecturer.User.PhotoPath));
            CreateMap<CourseEntity, CourseDetailsDTO>()
                .ForMember(dest => dest.SpecialityName, opts => opts.MapFrom(src => src.Speciality.Name))
                .ForMember(dest => dest.LecturerFullName, opts => opts.MapFrom(src => GetFullName(src.Lecturer.User)))
                .ForMember(dest => dest.LecturerPhotoPath, opts => opts.MapFrom(src => src.Lecturer.User.PhotoPath));
        }
    }
}
