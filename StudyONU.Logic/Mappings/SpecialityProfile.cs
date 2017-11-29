using StudyONU.Core.Entities;
using StudyONU.Logic.DTO.Speciality;

namespace StudyONU.Logic.Mappings
{
    class SpecialityProfile : ProfileBase
    {
        public SpecialityProfile()
        {
            CreateMap<SpecialityEntity, SpecialityDTO>();
        }
    }
}
