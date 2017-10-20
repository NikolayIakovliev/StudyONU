﻿using AutoMapper;
using StudyONU.Core.Entities;
using StudyONU.Logic.DTO.Guide;

namespace StudyONU.Logic.Mappings
{
    class GuideProfile : Profile
    {
        public GuideProfile()
        {
            CreateMap<GuideCreateDTO, GuideEntity>();
            CreateMap<GuideEntity, GuideListDTO>()
                .ForMember(dest => dest.CourseName, opts => opts.MapFrom(src => src.Course.Name))
                .ForMember(dest => dest.CourseNumber, opts => opts.MapFrom(src => src.Course.CourseNumber));
        }
    }
}