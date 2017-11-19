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
        }
    }
}
