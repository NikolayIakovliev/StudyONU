﻿using StudyONU.Core.Entities;
using StudyONU.Logic.DTO.Task;

namespace StudyONU.Logic.Mappings
{
    class TaskProfile : ProfileBase
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
            CreateMap<TaskEntity, TaskDetailsDTO>()
                .ForMember(dest => dest.FilePaths, opts => opts.MapFrom(src => Deserialize(src.FilePaths)));

        }
    }
}
