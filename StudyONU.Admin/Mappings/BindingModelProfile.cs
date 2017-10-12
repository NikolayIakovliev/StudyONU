using AutoMapper;
using StudyONU.Admin.Authentication;
using StudyONU.Admin.Models;
using StudyONU.Logic.DTO.Account;

namespace StudyONU.Admin.Mappings
{
    class BindingModelProfile : Profile
    {
        public BindingModelProfile()
        {
            CreateMap<LoginBindingModel, LoginDTO>()
                .ForMember(dest => dest.Issuer, opt => opt.MapFrom(src => JwtBearerSettings.Issuer))
                .ForMember(dest => dest.Key, opt => opt.MapFrom(src => JwtBearerSettings.Key));
        }
    }
}
