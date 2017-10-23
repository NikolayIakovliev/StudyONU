using AutoMapper;
using StudyONU.Admin.Authentication;
using StudyONU.Admin.Models;
using StudyONU.Admin.Models.Course;
using StudyONU.Admin.Models.Guide;
using StudyONU.Admin.Models.Lecturer;
using StudyONU.Admin.Models.Speciality;
using StudyONU.Admin.Models.Task;
using StudyONU.Logic.DTO.Account;
using StudyONU.Logic.DTO.Course;
using StudyONU.Logic.DTO.Guide;
using StudyONU.Logic.DTO.Lecturer;
using StudyONU.Logic.DTO.Speciality;
using StudyONU.Logic.DTO.Task;

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
            CreateMap<TaskCreateBindingModel, TaskCreateDTO>();
            CreateMap<SpecialityBindingModel, SpecialityDTO>();
        }
    }
}
