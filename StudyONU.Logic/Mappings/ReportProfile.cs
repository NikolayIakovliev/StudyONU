using StudyONU.Core.Entities;
using StudyONU.Logic.DTO.Report;

namespace StudyONU.Logic.Mappings
{
    class ReportProfile : ProfileBase
    {
        public ReportProfile()
        {
            CreateMap<ReportCreateDTO, ReportEntity>()
                .ForMember(dest => dest.FilePaths, opts => opts.MapFrom(src => Serialize(src.FilePaths)));
            CreateMap<ReportEntity, ReportListDTO>()
                .ForMember(dest => dest.FilePaths, opts => opts.MapFrom(src => Deserialize(src.FilePaths)))
                .ForMember(dest => dest.CourseId, opts => opts.MapFrom(src => src.Task.CourseId))
                .ForMember(dest => dest.TaskTitle, opts => opts.MapFrom(src => src.Task.Title))
                .ForMember(dest => dest.CourseName, opts => opts.MapFrom(src => src.Task.Course.Name))
                .ForMember(dest => dest.CourseNumber, opts => opts.MapFrom(src => src.Task.Course.CourseNumber))
                .ForMember(dest => dest.StudentPhoto, opts => opts.MapFrom(src => src.Student.User.PhotoPath))
                .ForMember(dest => dest.StudentEmail, opts => opts.MapFrom(src => src.Student.User.Email))
                .ForMember(dest => dest.StudentFullName, opts => opts.MapFrom(src => GetFullName(src.Student.User)));
        }
    }
}
