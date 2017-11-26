using AutoMapper;
using StudyONU.Logic.DTO.Account;
using StudyONU.Logic.DTO.Comment;
using StudyONU.Logic.DTO.Report;
using StudyONU.Logic.DTO.StudentQueue;
using StudyONU.Web.Authentication;
using StudyONU.Web.Models.Account;
using StudyONU.Web.Models.Comment;
using StudyONU.Web.Models.Report;
using StudyONU.Web.Models.StudentQueue;

namespace StudyONU.Web.Mappings
{
    class BindingModelProfile : Profile
    {
        public BindingModelProfile()
        {
            CreateMap<LoginBindingModel, LoginDTO>()
                .ForMember(dest => dest.Issuer, opt => opt.MapFrom(src => JwtBearerSettings.Issuer))
                .ForMember(dest => dest.Key, opt => opt.MapFrom(src => JwtBearerSettings.Key));

            CreateMap<ChangePasswordBindingModel, ChangePasswordDTO>();

            CreateMap<StudentQueueCreateBindingModel, StudentQueueCreateDTO>();

            CreateMap<ReportCreateBindingModel, ReportCreateDTO>();

            CreateMap<CommentCreateBindingModel, CommentCreateDTO>();
        }
    }
}
