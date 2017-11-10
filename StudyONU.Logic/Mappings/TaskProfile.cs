using AutoMapper;
using Newtonsoft.Json;
using StudyONU.Core.Entities;
using StudyONU.Logic.DTO.Task;
using System.Collections.Generic;

namespace StudyONU.Logic.Mappings
{
    class TaskProfile : Profile
    {
        public TaskProfile()
        {
            CreateMap<TaskCreateDTO, TaskEntity>()
                .ForMember(dest => dest.FilePaths, opts => opts.MapFrom(src => Serialize(src.FilePaths)));
            CreateMap<TaskEntity, TaskListDTO>()
                .ForMember(dest => dest.CourseName, opts => opts.MapFrom(src => src.Course.Name))
                .ForMember(dest => dest.CourseNumber, opts => opts.MapFrom(src => src.Course.CourseNumber))
                .ForMember(dest => dest.FilePaths, opts => opts.MapFrom(src => Deserialize(src.FilePaths)));
            CreateMap<TaskEntity, StudentTaskListDTO>()
                .ForMember(dest => dest.ReportStatus, opts => opts.Ignore())
                .ForMember(dest => dest.FilePaths, opts => opts.MapFrom(src => Deserialize(src.FilePaths)));
        }

        private IEnumerable<string> Deserialize(string filePaths)
        {
            return JsonConvert.DeserializeObject<IEnumerable<string>>(filePaths);
        }

        private string Serialize(IEnumerable<string> filePaths)
        {
            return JsonConvert.SerializeObject(filePaths);
        }
    }
}
