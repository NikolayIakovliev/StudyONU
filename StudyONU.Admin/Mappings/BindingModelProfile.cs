using AutoMapper;
using StudyONU.Admin.Authentication;
using StudyONU.Admin.Models;
using StudyONU.Admin.Models.Course;
using StudyONU.Admin.Models.Guide;
using StudyONU.Admin.Models.Lecturer;
using StudyONU.Logic.DTO.Account;
using StudyONU.Logic.DTO.Course;
using StudyONU.Logic.DTO.Guide;
using StudyONU.Logic.DTO.Lecturer;

namespace StudyONU.Admin.Mappings
{
    class BindingModelProfile : Profile
    {
        public BindingModelProfile()
        {
            CreateMap<LoginBindingModel, LoginDTO>()
                .ForMember(dest => dest.Issuer, opt => opt.MapFrom(src => JwtBearerSettings.Issuer))
                .ForMember(dest => dest.Key, opt => opt.MapFrom(src => JwtBearerSettings.Key));

            CreateMap<LecturerCreateBindingModel, LecturerCreateDTO>();
            CreateMap<CourseCreateBindingModel, CourseCreateDTO>();
            CreateMap<GuideCreateBindingModel, GuideCreateDTO>();
        }
    }
}
