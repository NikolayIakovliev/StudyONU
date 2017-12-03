using AutoMapper;
using StudyONU.Admin.Models.Account;
using StudyONU.Admin.Models.Comment;
using StudyONU.Admin.Models.Course;
using StudyONU.Admin.Models.Guide;
using StudyONU.Admin.Models.Lecturer;
using StudyONU.Admin.Models.Speciality;
using StudyONU.Admin.Models.Task;
using StudyONU.Logic.DTO.Account;
using StudyONU.Logic.DTO.Comment;
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
            CreateMap<LoginBindingModel, LoginDTO>();

            CreateMap<CourseCreateBindingModel, CourseCreateDTO>();
            CreateMap<CourseEditBindingModel, CourseEditDTO>();

            CreateMap<TaskCreateBindingModel, TaskCreateDTO>();
            CreateMap<TaskEditBindingModel, TaskEditDTO>();

            CreateMap<GuideCreateBindingModel, GuideCreateDTO>();
            CreateMap<GuideEditBindingModel, GuideEditDTO>();

            CreateMap<LecturerCreateBindingModel, LecturerCreateDTO>();
            CreateMap<SpecialityBindingModel, SpecialityDTO>();
            CreateMap<LecturerEditBindingModel, LecturerEditDTO>();

            CreateMap<ChangePasswordBindingModel, ChangePasswordDTO>();

            CreateMap<CommentCreateBindingModel, CommentCreateDTO>();

            CreateMap<UserEditBindingModel, UserEditDTO>()
                .ForMember(dest => dest.NewEmail, opt => opt.MapFrom(src => src.Email));
        }
    }
}
