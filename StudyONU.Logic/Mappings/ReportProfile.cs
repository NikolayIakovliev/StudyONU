using AutoMapper;
using StudyONU.Core.Entities;
using StudyONU.Logic.DTO.Report;

namespace StudyONU.Logic.Mappings
{
    class ReportProfile : Profile
    {
        public ReportProfile()
        {
            CreateMap<ReportCreateDTO, ReportEntity>();
            CreateMap<ReportEntity, ReportListDTO>()
                .ForMember(dest => dest.CourseId, opts => opts.MapFrom(src => src.Task.CourseId))
                .ForMember(dest => dest.TaskTitle, opts => opts.MapFrom(src => src.Task.Title))
                .ForMember(dest => dest.CourseName, opts => opts.MapFrom(src => src.Task.Course.Name))
                .ForMember(dest => dest.CourseNumber, opts => opts.MapFrom(src => src.Task.Course.CourseNumber))
                .ForMember(dest => dest.StudentPhoto, opts => opts.MapFrom(src => src.Student.User.PhotoPath))
                .ForMember(dest => dest.StudentEmail, opts => opts.MapFrom(src => src.Student.User.Email))
                .ForMember(dest => dest.StudentFullName, opts => opts.MapFrom(src => GetFullName(src.Student.User)));
        }
        
        private string GetFullName(UserEntity userEntity) =>
            $"{userEntity.LastName} {userEntity.FirstName} {userEntity.Patronymic}";
    }
}
