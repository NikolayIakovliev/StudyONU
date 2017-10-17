using AutoMapper;
using StudyONU.Core.Entities;
using StudyONU.Logic.DTO.Speciality;

namespace StudyONU.Logic.Mappings
{
    public class SpecialityProfile : Profile
    {
        public SpecialityProfile()
        {
            CreateMap<SpecialityEntity, SpecialityListDTO>();
        }
    }
}
