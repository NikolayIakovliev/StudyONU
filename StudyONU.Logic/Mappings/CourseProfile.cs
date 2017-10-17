using AutoMapper;
using StudyONU.Core.Entities;
using StudyONU.Logic.DTO.Course;

namespace StudyONU.Logic.Mappings
{
    class CourseProfile : Profile
    {
        public CourseProfile()
        {
            CreateMap<CourseCreateDTO, CourseEntity>();
        }
    }
}
