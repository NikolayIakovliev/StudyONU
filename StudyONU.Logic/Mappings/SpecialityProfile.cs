using AutoMapper;
using StudyONU.Core.Entities;
using StudyONU.Logic.DTO.Speciality;

namespace StudyONU.Logic.Mappings
{
    class SpecialityProfile : Profile
    {
        public SpecialityProfile()
        {
            CreateMap<SpecialityEntity, SpecialityDTO>();
        }
    }
}
